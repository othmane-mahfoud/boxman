var express = require('express')
var router  = express.Router()
var { getUsers, editUser } = require('../handlers/users')

router.get('/', getUsers)
router.put('/:id/edit', editUser)

module.exports = router
