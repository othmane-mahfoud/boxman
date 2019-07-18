const mongoose = require('mongoose')

mongoose.set('debug', true)
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/boxman', {useNewUrlParser: true})

module.exports.User = require('./user')
module.exports.Boxman = require('./boxman')
module.exports.Customer = require('./customer')
module.exports.Order = require('./order')
