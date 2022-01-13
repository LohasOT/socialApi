const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')
// make new user
router.post('/users/register', (req, res) => {
  const { name, username } = req.body
  User.register(new User({ name, username }), req.body.password, err => {
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

// edit user profile
router.put('/users/:id', passport.authenticate('jwt'), async function (req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, req.body)
  res.json(user)
})

// delete user
router.delete('/users/:id', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(reply =>
      res.json(reply)
    )
})
module.exports = router
