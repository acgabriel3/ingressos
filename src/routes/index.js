const router = require('../../node_modules/express').Router()
const path = require('path')

router.get('/', (req, res, next) => {
  res.status(200)
    .sendFile(path.join(__dirname + '../../../views/index.html'))
})



module.exports = router