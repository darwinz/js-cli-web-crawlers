'use strict'

const vivint = require('./crawlers/vivint_solar')
const google = require('./crawlers/google_analytics')

module.exports = function(app) {
  app.get(`/crawlers/solar/production`, (req, res) => {
    vivint.check_production()
    res.status(200).end('Success. Running production check with Vivint Solar... Email will be sent with the data')
  })

  app.get(`/crawlers/google/analytics`, (req, res) => {
    google.check_real_time()
    res.status(200).end(res.text())
  })
}
