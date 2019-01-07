var express = require('express');
var router = express.Router();
const Movie = require('../models/movie')

/* GET users listing. */
router.get('/movie', function (req, res, next) {
  Movie.find().sort({ update_at: -1 }).then(movies => {
    res.json(movies)
  })
    .catch(err => res.json(err))
});

router.post('/movie', function (req, res) {
  console.log(req.body);

  Movie.create(req.body, (err, movie) => {
    if (err) {
      res.json(err)
    } else {
      res.json(movie)
    }
  })
  
})

router.get('/movie/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.json(movie)
    })
    .catch(err => {
      res.json(err)
    })
})

router.delete('/movie/:id', (req, res) => {
  Movie.findOneAndRemove({
    _id: req.params.id
  })
    .then(movie => res.send(`${movie.title}删除成功`))
    .catch(err => res.json(err))
})

router.put('/movie/:id', (req, res) => {
  Movie.findOneAndUpdate({
    _id: req.params.id
  }, {
      $set: {
        title: req.body.title,
        rating: req.body.rating,
        poster: req.body.poster
      }
    }, { new: true })
    .then(movie => {
      res.json(movie)
    }).catch(err => {
      console.log(err);
    })
})

module.exports = router;
