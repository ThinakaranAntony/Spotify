const walletmoney = require('../service/walletmoneyservice')
const auth = require('../authentication/authenticationuser')
const router = require('express').Router()

router.post('/Addfixedmoney',auth.authenticateToken4,walletmoney.adminaddingwalletmoney)
router.put('/updatefixedmoney',auth.authenticateToken4,walletmoney.updatewalletmoney)
router.delete('/deletefixedmoney',auth.authenticateToken4,walletmoney.deletemoney)

module.exports=router