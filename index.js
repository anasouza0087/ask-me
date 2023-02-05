const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Question = require('./database/Questions')
const Answer = require('./database/Answer')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connection.authenticate()
    .then(() => {
        console.log('Conexão estabelecida!')
    })
    .catch((error) => {
        console.log(error)
    })

app.get('/', (req, res) => {
    Question.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then(questions => {
        res.render('index', {
            questions: questions
        })
    })
});

app.get('/questions', (req, res) => {
    res.render('questions')
})

app.get('/question/:id', (req, res) => {
    const id = req.params.id
    Question.findOne({
        where: { id: id },
    }).then(question => {
        if (question) {
            Answer.findAll({
                where: { questionId: question.id },
                order: [['id', 'DESC']]
            }).then(answers => {
                res.render('question', {
                    question: question,
                    answers: answers
                })
            })
        } else {
            res.redirect('/')
        }
    })
});

app.post('/saveQuestion', (req, res) => {
    const title = req.body.title || "-"
    const description = req.body.description || "-"
    Question.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect('/')
    })
})


app.post('/answer', (req, res) => {
    const body = req.body.bodyAnswer
    const questionId = req.body.questionId
    Answer.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect('/question/' + questionId)
    })
})

// app.get('/:name/:lang', (req, res) => {
//     const userName = req.params.name
//     const language = req.params.lang
//     const showMessage = true
//     const products = [
//         { item: 'Cheetos', price: 0.99 },
//         { item: 'Pringles', price: 1.99 },
//         { item: 'Coke', price: 3.00 },
//     ]
//     res.render('index', {
//         name: userName,
//         lang: language,
//         message: showMessage,
//         listOfItems: products
//     })
// })

app.listen(8080, () => console.log('Server Running'))