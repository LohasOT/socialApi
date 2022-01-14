const router = require('express').Router()
const { Friend, User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// // add a friend
// router.post('/friends/add/:id', passport.authenticate('jwt'), async function (req, res) {
//   const addFriend = await Friend.findOneAndUpdate(
//     { requester: UserA, recipient: UserB },
//     { $set: { status: 1 } }
//   )
//   const addFriend2 = await Friend.findOneAndUpdate(
//     { recipient: UserA requester: UserB },
//     { $set: { status: 1 } }
//   )
//   res.sendStatus(200)
// })

// // delete a friend
// router.put('/friends/remove/:id', passport.authenticate('jwt'), async function (req, res) {
  
//   const removeFriend = await User.findByIdAndUpdate(req.user._id, { $pull: { friends: req.params.id } })

//   const removeFriend2 = await User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.user._id } })
//   res.sendStatus(200)
// })

module.exports = router