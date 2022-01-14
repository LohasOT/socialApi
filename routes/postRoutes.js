const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')
const { sendStatus } = require('express/lib/response')

// find all posts
router.get('/posts', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.find({}).populate('user').populate('notes')
  res.json(posts)
})

// find one post
router.get('/post/:id', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.findById(req.params.id).populate('user').populate('notes')
  res.json(posts)
})

// create a post
router.post('/posts', passport.authenticate('jwt'), async function (req, res) {
  const post = await Post.create({ ...req.body, user: req.user._id })
  await User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
  res.json(post)
})

// edit one post
router.put('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  const post = await Post.findByIdAndUpdate(req.params.id, { $set: req.body })
  res.json(post)
})

// delete one post
router.delete('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  await Post.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})



module.exports = router
