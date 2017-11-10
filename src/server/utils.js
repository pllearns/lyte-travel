const renderError = function (err, req, res) {
  res.send(`Error: ${err.message}\n\n${err.stack}`)
}

const renderUnauthorized = function (res, err) {
  res.status(403).render('common/unauthorized')
}

module.exports = { renderError, renderUnauthorized }

