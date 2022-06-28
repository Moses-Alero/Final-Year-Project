const crypto = require('crypto')
const hash =(input) => crypto.createHash('sha256').update(input).digest('hex');

module.exports = {
  hash
}