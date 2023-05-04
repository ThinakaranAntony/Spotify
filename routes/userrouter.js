const userservice = require('../service/userservice.js')
const router = require('express').Router()


router.post('/adduser',userservice.addUser)
router.get('/allusers',userservice.getAllUsers)
router.put('/updateuser/:id',userservice.updateUser)
router.delete('/deleteuser/:id',userservice.deleteUser)

module.exports = router