'use strict'

const fs = require('fs')
const prompt = require('prompt')
let config_props = [
  'SESSION_SECRET',
  'SOLAR_PROVIDER_NAME',
  'SOLAR_LOGIN_URL',
  'SOLAR_AUTH_USERNAME',
  'SOLAR_AUTH_PASSWORD',
  'GOOGLE_ANALYTICS_URL',
  'GOOGLE_AUTH_USERNAME',
  'GOOGLE_AUTH_PASSWORD',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_REGION',
  'COMCAST_GATEWAY_USERNAME',
  'COMCAST_GATEWAY_PASSWORD',
  'USER_EMAIL'
]

let new_config_name = 'development'

setup_new_config()

function setup_new_config() {
  return new Promise((resolve, reject) => {
    prompt.start()
    prompt.get('NEW_ENV', (err, result) => {
      if(err) {
        reject(`There was an error setting the new config environment. Error => ${err}`)
      } else {
        new_config_name = result.NEW_ENV.toString().trim().replace('.json','').replace('json','') || new_config_name
        resolve(new_config_name)
      }
    })
  })
  .then((name) => {
    fs.createReadStream('./config/default.json').pipe(fs.createWriteStream(`./config/${name}.json`))
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      prompt.start()
      prompt.get(config_props, (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
    })
  })
  .then((result) => {
    let d = result
    if(result === false) {
      console.log(`There was an error getting user input`)
      process.exit(-1)
    } else {
      fs.readFile(`./config/${new_config_name}.json`, 'utf-8', (err, data) => {
        if(err) {
          console.log(`There was an error getting user input`)
          process.exit(-1)
        } else {
          let clean = data
          for(let prop=0; prop<config_props.length; prop++) {
            clean = clean.replace(config_props[prop], d[config_props[prop]])
          }
          fs.writeFile(`./config/${new_config_name}.json`, clean, 'utf-8', err => {
            if(err) {
              console.log(`There was an error writing to file => ${err}`)
              process.exit(-1)
            }
          })
        }
      })
    }
  })
  .catch(err => {
    console.log(`There was an error caught => ${err.message}. Stack => ${err.stack}`)
  })
}
