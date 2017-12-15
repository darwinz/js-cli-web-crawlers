'use strict'

module.exports = function(app) {
  app.get(`/latest`, function(req, res) {
    res.status(200).end('Great')
  })
}
