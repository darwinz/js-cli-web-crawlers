'use strict'

const Horseman = require("node-horseman");
const phantomInstance = new Horseman();
const config = require('config')

module.exports = {
  check_real_time
}

if(process.argv.find(arg => arg==='--run')) {
  check_real_time()
}

function check_real_time() {
  try {
    console.log('Checking real time analytics')
    return phantomInstance
      .userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36')
      .open(config.get('google.analyticsUrl'))
      .log(`Logging in to ${config.get('google.analyticsUrl')}`)
      .click('div[id="identifierLink"]')
      .cookies()
      .type('input[name="identifier"]', config.get('google.auth.username'))
      .click('div[id="identifierNext"]')
      .cookies()
      .waitForNextPage()
      .type('input[type="password"]', config.get('google.auth.password'))
      .click('div[id="passwordNext"]')
      .cookies()
      .waitForNextPage()
      .click('a:contains("REAL-TIME")')
      .click('a:contains("Overview")')
      .waitForNextPage()
      .cookies()
      .text('div[id="ID-overviewCounterValue"]')
      .log()
      .then()
      .close()
  }
  catch(e) {
    console.log(`Error encountered. Error => ${e.message}. Stack => ${e.stack}`)
    return false
  }
}
