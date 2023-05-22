const songservice = require('../service/songservice')
const auth = require('../authentication/authenticationuser')
const router = require('express').Router()

router.post('/addsong', auth.authenticateToken2, songservice.addsong)
router.put('/updatesong/:id', auth.authenticateToken2, songservice.updatesong)
router.delete('/deletesong/:id', auth.authenticateToken2, songservice.deletesong)
router.get('/songs', auth.authenticateToken1, songservice.showpublicsongs)
router.get('/premiumsongs', auth.authenticateToken, songservice.showpremiumsongs)
router.get('/mysongs', auth.authenticateToken2, songservice.artistsong)
router.put('/like/:id', auth.authenticateToken3, songservice.userlike)
router.post('/comment/:id', auth.authenticateToken3, songservice.comments)
module.exports = router