const express = require('express')
const router = express.Router()
const path = require('path')
const static = path.join(__dirname + '../../../static')

router.use(express.static(static))

router.get('/', (req, res, next) => {
  res.sendFile(path.join(static, 'views/index.html'))
})

module.exports = router