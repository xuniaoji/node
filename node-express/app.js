var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var movie = require('./routes/movie');

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/movie')


const port = process.env.PORT || 3000


/* const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose error')
})
db.once('open', () => {
  const movieSchema = mongoose.Schema({
    title: {
      type: String,
      require: true,
    },
    poster: String,
    rating: String,
    introduction: String,
    create_at: {
      type: Date,
      default: Date.now
    },
    update_at: {
      type: Date,
      default: Date.now
    },
  })

  const movieModel = mongoose.model('movie', movieSchema)

  const firstMovie = new movieModel({
    title: '雷神',
    poster: '111',
    rating: '1',
    introduction: '雷神电影',
  })

  firstMovie.save((err, doc) => {
    if (err) {
      console.error(err);

    }
    console.log(doc);
    movieModel.find((error, docs) => {
      console.log(docs);

    })
  })
}) */




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', movie);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
