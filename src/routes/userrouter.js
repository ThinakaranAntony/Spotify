const router = require('express').Router();
const userController = require('../Controller/userController');
const auth = require('../authentication/authenticationuser');
const validation = require('../service/joivalidation.js')

router.post('/adminsignup',validation.createAdmin,auth.authenticateToken4,userController.addAdmin);
router.post('/Signup', validation.createUser,userController.addUser);
router.get('/allusers', auth.authenticateToken4, userController.getAllUsers);
router.put('/updateuser/:id',validation.updateUser, auth.authenticateToken3, userController.updateUser);
router.delete('/deleteuser/:id', validation.deleteUser,auth.authenticateToken3, userController.deleteUser);
router.post('/login',validation.login, userController.login);
router.put('/addmoney/:id',validation.userWallet, auth.authenticateToken3, userController.userWallet);
router.put('/addsubscription/:id',validation.subscription, auth.authenticateToken3, userController.addSubscription);
router.get('/subscriptiondetails', auth.authenticateToken1,userController.subscriptionDetails);
router.get('/premiumuser',auth.authenticateToken4,userController.adminPremiumUser);
router.get('/nonpremiumuser',auth.authenticateToken4,userController.adminNonPremiumUser);
router.post('/checkotp',validation.checkOtp,userController.checkOtp);
router.post('/otpmail',userController.emailCheckOtp);

module.exports = router;