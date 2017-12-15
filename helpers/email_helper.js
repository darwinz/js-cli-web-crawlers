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
  ses.sendEmail(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
  });
}
