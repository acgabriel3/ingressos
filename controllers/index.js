exports.getIndexPage = (req, res, next) => {
  res.render('index', { title: 'Lojas Cerradinho' })
}