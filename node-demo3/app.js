const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const md5 = require('md5-node')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

app.use(express.static('public'))

const mongoClient = require('mongodb').MongoClient
const monogoUrl = ' mongodb://127.0.0.1:27017'
const dbName = 'admin'

const session = require('express-session');

app.use(session({
    secret: 'fffdst',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10000000 }
}))

app.use((req, res, next) => {
    if (req.url === '/login' || req.url === '/doLogin') {
        next()
    } else {
        console.log(req.session.userinfo);

        if (req.session.userinfo && req.session.userinfo.username !== '') {
            app.locals['userinfo'] = req.session.userinfo
            next()
        } else {
            res.redirect('/login')
        }
    }
})

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/doLogin', (req, res) => {
    mongoClient.connect(monogoUrl, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log('连接数据库错误');
        }
        const db = client.db(dbName)
        db.collection('user').find({ username: req.body.username, password: md5(req.body.password) }).toArray((error, results) => {

            if (results.length) {
                req.session.userinfo = results[0];

                res.redirect('/product')
            } else {
                res.send("<script>alert('登录失败');history.back()</script>")
            }
            client.close()
        })
    })
})

app.get('/product', (req, res) => {
    mongoClient.connect(monogoUrl, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            console.log('连接数据库失败');
        }
        const db = client.db(dbName)
        db.collection('product').find().toArray((err, results) => {
            if (err) {
                console.log(err);
                return
            }
            res.render('product', { list: results })
        })
    })
})



app.get('/productAdd', (req, res) => {
    res.render('productAdd')
})

app.get('/productEdit', (req, res) => {
    res.render('productEdit')
})

app.get('/loginOut', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/login')
    })
})

app.listen(3000)