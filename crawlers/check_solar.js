'use strict'

const app = require('../server')
const Horseman = require("node-horseman");
const phantomInstance = new Horseman();
const config = require('config')
const emailHelper = require('../helpers/email_helper')

console.log('STARTING check_solar')

app.then(() => console.log('App started'))
  .then(check_solar)
  .then(() => { process.exit(0) })
  .catch(err => {
    console.error(err)
    process.exit(-1)
  })

function check_solar() {
  try {
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
          emailHelper.send_email(
            config.get('user.email'),
            config.get('user.email'),
            `Solar Production for ${new Date()}`,
            `The following is the solar production for date: ${new Date()}:\n\n${result}`
          )
        }
        catch(err) {
          console.log(`There was an error => ${err.message}. Stack => ${err.stack}`)
        }
        return result
      })
      .log()
      .close()
  }
  catch(e) {
    console.log(`Error encountered. Error => ${e.message}. Stack => ${e.stack}`)
    return false
  }
}
