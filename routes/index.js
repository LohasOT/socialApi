const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./thoughtRoutes.js'))
router.use('/api', require('./reactionRoutes.js'))

module.exports = router
