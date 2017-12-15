/* eslint "no-console": 0 */
'use strict'

const assert = require('assert')
const jsCli = require('./index.js')

const arbitraryMinimumNumberOfConfigProperties = 5

assert(Object.keys(jsCli).length > arbitraryMinimumNumberOfConfigProperties, `jsCli does not have more than ${arbitraryMinimumNumberOfConfigProperties} properties`)
assert.equal(jsCli.env, process.env['NODE_ENV'], `jsCli environment '${jsCli.env}' does not match environment variable '${process.env.NODE_ENV}'`)

console.log('All assertions passed')