'use strict'

const vivint = require('./crawlers/vivint_solar')

module.exports = function(app) {
  app.get(`/crawlers/solar/production`, (req, res) => {
    vivint.check_production()
    res.status(200).end('Success. Running production check with Vivint Solar... Email will be sent with the data')
  })
}
