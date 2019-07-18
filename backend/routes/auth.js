const express = require('express')
const router  = express.Router()
const { 
    registerBoxman, 
    registerCustomer, 
    loginBoxman, 
    loginCustomer, 
    fbRegisterBoxman, 
    fbRegisterCustomer, 
    fbLoginBoxman, 
    fbLoginCustomer 
} = require('../handlers/auth')

// Prefix - /api/auth

router.post('/registerBoxman', registerBoxman)
router.post('/registerCustomer', registerCustomer)
router.post('/loginBoxman', loginBoxman)
router.post('/loginCustomer', loginCustomer)
router.post('/fbRegisterBoxman', fbRegisterBoxman)
router.post('/fbRegisterBoxman', fbRegisterCustomer)
router.post('/fbLoginCustomer', fbLoginBoxman)
router.post('/fbLoginCustomer', fbLoginCustomer)

module.exports = router
