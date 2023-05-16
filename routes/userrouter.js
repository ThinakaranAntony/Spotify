const userservice = require('../service/userservice.js')
const auth = require('../authentication/authenticationuser')
const router = require('express').Router()


router.post('/Signup', userservice.addUser)
router.get('/allusers', auth.authenticateToken4, userservice.getAllUsers)
router.put('/updateuser/:id', auth.authenticateToken3, userservice.updateUser)
router.delete('/deleteuser/:id', auth.authenticateToken3, userservice.deleteUser)
router.post('/login', userservice.login)
router.put('/addmoney/:id', auth.authenticateToken3, userservice.userwallet)
router.put('/addsubscription/:id', auth.authenticateToken3, userservice.addsubscription)
router.get('/subscriptiondetails', auth.authenticateToken3, userservice.subscriptiondetails)
router.get('/premiumuser',userservice.adminpremiumuser)
router.get('/nonpremiumuser',userservice.adminnonpremiumuser)

module.exports = router