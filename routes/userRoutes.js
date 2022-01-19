const router = require('express').Router()
const { User, Thought } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// make new user
router.post('/users/register', (req, res) => {
  const { username, email } = req.body
  User.register(new User({ username, email }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})
// login user
router.post('/users/login', (req, res) => {
  const { username } = req.body
  User.authenticate()(username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})
// get user profile
router.get('/users/profile', passport.authenticate('jwt'), (req, res) => res.json(req.user))

// get all users
router.get('/users', passport.authenticate('jwt'), async function (req, res) {
  const users = await User.find({}).populate('posts')
  res.json(users)
})

// get one user
router.get('/user/:id', passport.authenticate('jwt'), async function (req, res) {
  const user = await User.findById(req.params.id).populate('posts')
  res.json(user)
})


// edit user profile
router.put('/users/:id', passport.authenticate('jwt'), async function (req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, req.body)
  res.json(user)
})

// delete user
router.delete('/users/:id', async function (req, res) {
  const user = await User.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

// add friend
router.post('/user/:userId/friend/:friendId', passport.authenticate('jwt'), async function (req, res) {
  const friend = await User.findByIdAndUpdate (req.params.userId, { $addToSet: { friends: req.params.friendId } })
  const friend2 = await User.findByIdAndUpdate(req.params.friendId, { $addToSet: { friends: req.params.userId } })
  res.sendStatus(200)

})

// delete friend
router.delete('/user/:userId/friend/:friendId', passport.authenticate('jwt'), async function (req, res) {
  const friend = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } })
  const friend2 = await User.findByIdAndUpdate(req.params.friendId, { $pull: { friends: req.params.userId } })
  res.sendStatus(200)

})
module.exports = router
