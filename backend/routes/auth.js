const express = require('express')
const router  = express.Router()
const { register, login, fbRegister, fbLogin } = require('../handlers/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/fb_register', fbRegister)
router.post('/fb_login', fbLogin)

module.exports = router
