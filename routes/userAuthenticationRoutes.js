const express = require('express');
const {createUserAccount, loginUser} = require('../controller/userAuthenticationController');
const router = express.Router()


router.post("/signup", createUserAccount)
router.post("/login", loginUser)


module.exports = router
