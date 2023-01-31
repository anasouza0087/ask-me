import express from 'express'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
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