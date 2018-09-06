'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = {
  NODE_ENV: '"production"',
  API_URL: '"https://api.pirotechnics.sylvaindenyse.me"',
  API_PORT: '"443"'
}
