const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const md5 = require('md5-node')

// const mongoose = require('mongoose')

const multiparty = require('multiparty');

const mongoModule = require('./modules/db')


const adminRouter = require('./routes/admin')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/public/upload', express.static('public/upload'));
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

/* const monogoUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'admin'

mongoose.connect(`${monogoUrl}/${dbName}`);
const db = mongoose.connection

db.on('error', () => {
    console.log('mongoose error')
})
db.once('open', () => {
    console.log('moogoose connected')
    const loginScheme = mongoose.Schema({
        sex: String,
        job: String
    })


    loginScheme.methods.doJob = function () {
        console.log(this.sex + '444444');

    }
    const loginModel = mongoose.model('loginModel', loginScheme);
    const loginInstance = new loginModel({ sex: 'nv', job: '123dd456' })
    console.log(loginInstance.sex);
    loginInstance.doJob()

    loginInstance.save((err, loginInstance) => {
        if (err) {
            return console.log(err)
        }
        loginInstance.doJob()
        loginModel.find({ sex: /^nv/ }, (err, datas) => {
            console.log(datas);

        })
    })
}) */

app.use('/admin', adminRouter)

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/doLogin', (req, res) => {
    mongoModule.find('user', { username: req.body.username, password: md5(req.body.password) }, (results) => {
        if (results.length) {
            req.session.userinfo = results[0];
            console.log('fffffff')
            res.redirect('/product')
        } else {
            res.send("<script>alert('登录失败');history.back()</script>")
        }
    })

})

app.get('/product', (req, res) => {
    mongoModule.find('product', {}, (results) => {
        res.render('product', { list: results })
    })
    // mongoClient.connect(monogoUrl, { useNewUrlParser: true }, (error, client) => {
    //     if (error) {
    //         console.log('连接数据库失败');
    //     }
    //     const db = client.db(dbName)
    //     db.collection('product').find().toArray((err, results) => {
    //         if (err) {
    //             console.log(err);
    //             return
    //         }
    //         res.render('product', { list: results })
    //     })
    // })
})



app.get('/productAdd', (req, res) => {
    res.render('productAdd')
})

app.post('/doAdd', (req, res) => {
    console.log(11111111111);

    const options = {
        uploadDir: 'public/upload'
    }
    var form = new multiparty.Form(options);
    form.parse(req, (error, fields, files) => {
        console.log(fields);
        console.log(files);
        mongoModule.insert('product', {
            title: fields.title[0],
            price: fields.price[0],
            fee: fields.fee[0],
            description: fields.description[0],
            path: files.pic[0].path
        }, () => {
            res.redirect('/product')

        })
    })
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