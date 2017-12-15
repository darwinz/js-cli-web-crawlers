'use strict'

const express   = require('./express')
const config    = require('config')

let expressApp

module.exports = {
  start,
  expressApp
}

const MSG = {
  APP_CONNECT_SUCCESS:   (opts) => `App listening at http://${opts.ip}:${opts.port}; environment: '${opts.env}'`,
  APP_CONNECT_FAIL:      (opts) => `App failed to listen on port '${opts.port}'`,
}

function start() {
  console.log('Running app start')
  if (expressApp) {
    return Promise.resolve(expressApp)
  }

  console.log('App not started yet')

  try {
    return expressInit()
  }
  catch(err) {
    console.log(`There was an error starting the Express app. Error message => ${err.message}. Error stack => ${err.stack}`)
    process.exit(-1)
  }
}

function expressInit () {
  return new Promise((resolve, reject) => {
    express.init(app => {
      if (app) {
        resolve(app)
      } else {
        reject('Express initialization failed.')
      }
    })
  })
}
