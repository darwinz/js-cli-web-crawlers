'use strict'

const config = require('config')
const AWS = require('aws-sdk')
AWS.config.update({
  accessKeyId: config.get('aws.accessKeyId'),
  secretAccessKey: config.get('aws.secretAccessKey'),
  region: config.get('aws.region')
});
const ses = new AWS.SES({apiVersion: '2010-12-01'})

module.exports = {
  send_email
}

function send_email (from, to, subject, message) {
  return new Promise((resolve, reject) => {
    console.log('Sending email notification')
    const params = {
      Destination: {
        BccAddresses: [],
        CcAddresses: [],
        ToAddresses: [to]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: message
          },
          Text: {
            Charset: "UTF-8",
            Data: message
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject
        }
      },
      Source: from
    };
    try{
      ses.sendEmail(params, (err, data) => {
        if (err) {
          reject(`There was an error sending email notification. Error => ${err.message}. Stack => ${err.stack}`)
        } else {
          data.message = message
          resolve(data)
        }
      });
    } catch(e) {
      reject(`There was an error sending email notification => ${e.message}. Stack => ${e.stack}`)
    }
  })
}
