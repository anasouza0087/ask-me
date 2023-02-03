const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Question = require('./database/Questions')

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
    res.render('index')
});

app.get('/questions', (req, res) => {
    res.render('questions')
})

app.post('/saveQuestion', (req, res) => {
    const title = req.body.title || "-"
    const description = req.body.description || "-"
    const message = 'Pergunta recebida com sucesso!'
    res.send(`<b>${message}</b> 
    <br><br> 
    <b>Título:</b> ${title} 
    <br> 
    <b>Descrição:</b> ${description}`
    )
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