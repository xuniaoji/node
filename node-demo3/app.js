const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('product')
})

app.get('/product', (req, res) => {
    res.render('product')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/productAdd', (req, res) => {
    res.render('productAdd')
})

app.get('/productEdit', (req, res) => {
    res.render('productEdit')
})

app.listen(3000)