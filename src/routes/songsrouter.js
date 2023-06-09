const router = require('express').Router();
const songController = require('../Controller/songController');
const auth = require('../authentication/authenticationuser');
const validation = require('../service/joivalidation.js')

router.post('/addsong', validation.addSong,auth.authenticateToken2, songController.addSong);
router.put('/updatesong/:id', validation.updateSong,auth.authenticateToken2, songController.updateSong);
router.delete('/deletesong/:id',auth.authenticateToken2, songController.deleteSong);
router.get('/songs', auth.authenticateToken1, songController.showPublicSongs);
router.get('/premiumsongs', auth.authenticateToken, songController.showPremiumSongs);
router.get('/mysongs', auth.authenticateToken2, songController.artistSong);
router.put('/like/:id', validation.userLike,auth.authenticateToken3, songController.userLike);
router.post('/comment/:id', validation.comments,auth.authenticateToken3, songController.comments);
module.exports = router;