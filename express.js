'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const config = require('config')
const addRoutes = require('./routes')

let app = express()

var initMiddleware = (app) => {
  app.use(cookieParser(config.secrets.session))
  app.use(bodyParser.urlencoded({ extended: false })) // get information from html forms
  app.use(bodyParser.json())
  addRoutes(app)
}

module.exports.init = (initializedCallback) => {
  try {
    app = express()
    initMiddleware(app)
    app.listen(3000, () => console.log('Express has started on port 3000'))
  }
  catch(e) {
    console.log(`Error loading Express. Error message => ${e.message}. Stack => ${e.stack}`)
    process.exit(-1)
  }
  finally {
    initializedCallback(app)
  }
}
