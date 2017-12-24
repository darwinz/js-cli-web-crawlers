'use strict'

const Horseman = require("node-horseman");
const phantomInstance = new Horseman();
const config = require('config')
const emailHelper = require('../helpers/email_helper')

module.exports = {
  check_production
}

if(process.argv.find(arg => arg==='--run')) {
  check_production()
}

function check_production() {
  try {
    console.log('Checking weekly solar production')
    return phantomInstance
      .userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36')
      .open(config.get('solar.loginUrl'))
      .log(`Logging in to ${config.get('solar.loginUrl')}`)
      .type('input[type="input"]', config.get('solar.auth.username'))
      .type('input[type="password"]', config.get('solar.auth.password'))
      .click('button[type="submit"]')
      .cookies()
      .waitForNextPage()
      .count('div.auth-container')
      .click('a:contains("Manage My Account")')
      .waitForNextPage()
      .cookies()
      .wait('20000')
      .text('div.chart-totals__listing--total')
      .then((result) => {
        try {
          return emailHelper.send_email(
            config.get('user.email'),
            config.get('user.email'),
            `Solar Production for ${new Date()}`,
            `The following is the solar production for date: ${new Date()}:\n\n${result}`
          )
        } catch(err) {
          console.log(`There was an error => ${err.message}. Stack => ${err.stack}`)
        }
      })
      .log()
      .then()
      .close()
  }
  catch(e) {
    console.log(`Error encountered. Error => ${e.message}. Stack => ${e.stack}`)
    return false
  }
}
