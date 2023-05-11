const walletmoney = require('../service/walletmoneyservice')
const router = require('express').Router()

router.post('/Addfixedmoney',walletmoney.adminaddingwalletmoney)
router.put('/updatefixedmoney',walletmoney.updatewalletmoney)
router.delete('/deletefixedmoney',walletmoney.deletemoney)

module.exports=router