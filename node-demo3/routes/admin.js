const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Time:', Date.now());
    next()
})

router.get('/', (req, res) => {
    res.send('admin index')
})

router.get('/add', (req, res) => {
    res.send('admin add')
})

module.exports = router