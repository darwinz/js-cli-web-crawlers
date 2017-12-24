'use strict'

const config = require('config')
const emailHelper = require('./helpers/email_helper')

const result = 'This is a test'

emailHelper.send_email(
  config.get('user.email'),
  config.get('user.email'),
  `Solar Production for ${new Date()}`,
  `The following is the solar production for date: ${new Date()}:\n\n${result}`
)
