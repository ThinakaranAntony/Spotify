const userservice = require('../service/userservice.js')
const router = require('express').Router()


router.post('/Signup',userservice.addUser)
router.get('/allusers',userservice.getAllUsers)
router.put('/updateuser/:id',userservice.updateUser)
router.delete('/deleteuser/:id',userservice.deleteUser)
router.post('/login',userservice.login)
router.put('/addmoney/:id',userservice.userwallet)
router.put('/addsubscription/:id',userservice.addsubscription)


module.exports = router