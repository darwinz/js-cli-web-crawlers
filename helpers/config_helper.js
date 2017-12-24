'use strict'

const fs = require('fs')
const stdin = process.openStdin()

let new_config_name = 'development'

stdin.addListener("What do you want to name the new config? ", (d) => {
  // note:  d is an object, and when converted to a string it will
  // end with a linefeed.  so we (rather crudely) account for that
  // with toString() and then trim()
  console.log("you entered: [" +
    d.toString().trim() + "]")
  new_config_name = d.toString().trim().replace('.json','').replace('json','') || new_config_name
});

fs.createReadStream('./config/default.json').pipe(fs.createWriteStream(`./config/${new_config_name}.json`))
