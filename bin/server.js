const app = require('../src/app')

normalizaPort = (val) => {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

const port = normalizaPort(process.env.PORT || '3000')

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})