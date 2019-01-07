var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/config')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
  console.log('success');
  let kittySchema = new mongoose.Schema({
    name: String
  })

  kittySchema.methods.speak = function () {
    let greeting = this.name ? 'meow name is' + this.name : 'dont have name'
    console.log(greeting);
  }

  let Kitten = mongoose.model('Kitten', kittySchema)

  let bird = new Kitten({ name: 'bird' })

  bird.save((err, bird) => {
    if (err) {
      return console.error(err);

    }
    bird.speak();
    Kitten.find((err, kittens) => {
      if (err) {
        return console.error(err);

      }
      console.log(kittens);

    })
  })




})
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
