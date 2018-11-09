const express = require('express')
const bodyParser = require('body-parser')
const mongoClient = require('mongodb').MongoClient
const mongoUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'product'
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const app = express()

app.use(session({
    secret: 'gxgg',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1000 * 10
    },
    store: new mongoStore({
        url: mongoUrl,
        touchAfter: 10
    })
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))


app.use((req, res, next) => {
    if ((session.userinfo && session.userinfo.username) || (req.url === '/login' || req.url === '/doLogin')) {
        console.log(session.userinfo);

        next()
    } else {
        res.redirect('/login')
    }
})

app.get('/', (req, res) => {
    res.send('首页')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/product', (req, res) => {
    res.render('product')
})

app.get('/productAdd', (req, res) => {
    res.render('productAdd')
})

app.get('/productEdit', (req, res) => {
    res.render('productEdit')
})

app.get('/productDelete', (req, res) => {
    res.send('删除商品')
})

app.post('/doLogin', (req, res) => {
    console.log(req.body);
    mongoClient.connect(mongoUrl, (err, client) => {
        if (err) {
            return console.log('连接数据库错误')
        }
        const db = client.db(dbName);
        /* db.collection('user').insertOne({ username: req.body.username, password: req.body.password, status: '2' })
        console.log('设置成功'); */
        db.collection('user').find(req.body).toArray((error, results) => {
            if (results.length) {
                session.userinfo = results[0]
                res.redirect('/product')
            } else {
                res.send("<script>alert('登录失败');history.back()</script>")
            }
            client.close()
        })



    })
})

app.listen(8000)