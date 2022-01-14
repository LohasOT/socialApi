const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./postRoutes.js'))
router.use('/api', require('./noteRoutes.js'))
router.use('/api', require('./addFriendRoutes.js'))

module.exports = router
