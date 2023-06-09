const router = require('express').Router();
const walletmoney = require('../Controller/walletmoneyController');
const auth = require('../authentication/authenticationuser');

router.post('/Addfixedmoney', auth.authenticateToken4, walletmoney.adminAddingWalletMoney);
router.put('/updatefixedmoney', auth.authenticateToken4, walletmoney.updateWalletMoney);
router.delete('/deletefixedmoney', auth.authenticateToken4, walletmoney.deleteMoney);

module.exports = router;