const songservice = require('../service/songservice')
const router = require('express').Router()

router.post('/addsong',songservice.addsong)
router.put('/updatesong/:id',songservice.updatesong)
router.delete('/deletesong/:id',songservice.deletesong)
module.exports = router