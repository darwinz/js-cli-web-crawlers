'use strict'

const Horseman = require("node-horseman");
const phantomInstance = new Horseman({timeout: 30000});
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
    console.log('Resetting Comcast gateway')
    return phantomInstance
      .userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36')
      .open('http://10.0.0.1/index.php')
      .log(`Logging in to Comcast gateway`)
      .screenshot('login.png')
      .type('input#username', config.get('comcast.gateway.auth.username'))
      .type('input#password', config.get('comcast.gateway.auth.password'))
      .click('input[type="submit"]')
      .cookies()
      .wait(20000)
      .screenshot('authenticated.png')
      .click('a[href="troubleshooting_logs.php"]')
      .waitForNextPage()
      .cookies()
      .screenshot('troubleshoot.png')
      .click('a[href="restore_reboot.php"]')
      .cookies()
      .waitForNextPage()
      .screenshot('reset_page.png')
      .wait(7000)
      .click('a#btn1')
      .wait(3000)
      .screenshot('reset_clicked.png')
      .click('input#popup_ok')
      .wait(3000)
      .screenshot('popup_clicked.png')
      .then((result) => {
        console.log("RESULT: " + result);

        try {
          return emailHelper.send_email(
            config.get('user.email'),
            config.get('user.email'),
            `Comcast Gateway was restarted`,
            `The Comcast gateway was restarted because the Internet was down`
          )
        } catch(err) {
          console.log(`There was an error => ${err.message}. Stack => ${err.stack}`)
        }
      })
      .close()
  }
  catch(e) {
    console.log("There was an error");
    console.log(`Error encountered. Error => ${e.message}. Stack => ${e.stack}`)
    return false
  }
}
