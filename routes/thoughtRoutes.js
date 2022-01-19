const router = require('express').Router()
const { Thought, User } = require('../models')
const passport = require('passport')
const { sendStatus } = require('express/lib/response')

// find all thoughts
router.get('/thoughts', passport.authenticate('jwt'), async function (req, res) {
  const thoughts = await Thought.find({}).populate('user').populate('reactions')
  res.json(thoughts)
})

// find one thought
router.get('/thought/:id', passport.authenticate('jwt'), async function (req, res) {
  const thought = await Thought.findById(req.params.id).populate('user').populate('reactions')
  res.json(thought)
})

// create a thought
router.post('/thoughts', passport.authenticate('jwt'), async function (req, res) {
  const thought = await Thought.create({ ...req.body, user: req.user._id })
  await User.findByIdAndUpdate(req.user._id, { $push: { thoughts: thought._id } })
  res.json(thought)
})

// edit one thought
router.put('/thoughts/:id', passport.authenticate('jwt'), async function (req, res) {
  const thought = await Thought.findByIdAndUpdate(req.params.id, { $set: req.body })
  res.json(thought)
})

// delete one thought
router.delete('/thought/:id', passport.authenticate('jwt'), async function (req, res) {
  await Thought.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})



module.exports = router
