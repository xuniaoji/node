const mongoose = require('mongoose')

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

module.exports = mongoose.model('Movie', movieSchema)