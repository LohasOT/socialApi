const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// add a friend
router.put('/friends/add/:id', passport.authenticate('jwt'), async function (req, res) {
  const addFriend = await User.findByIdAndUpdate(req.user._id, { $addToSet: { friends: req.body } })
  const addFriend2 = await User.findByIdAndUpdate(req.body, { $addToSet: { friends: req.user._id } })
  res.sendStatus(200)
})

// delete a friend
router.put('/friends/remove/:id', passport.authenticate('jwt'), async function (req, res) {
  
  const removeFriend = await User.findByIdAndUpdate(req.user._id, { $pull: { friends: req.params.id } })

  const removeFriend2 = await User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.user._id } })
  res.sendStatus(200)
})

module.exports = router