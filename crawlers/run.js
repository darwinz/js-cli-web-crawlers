'use strict'

const vivint = require('./vivint_solar')

process.argv.forEach(function (val, index, array) {
  if (val.indexOf('--crawler') !== -1) {
    // console.log(index + ': ' + val);
    const crawler = val.split('=')[1]
    switch(crawler) {
      case 'solar':
      case 'vivint':
        vivint.check_production()
        break;
    }
  }
});
