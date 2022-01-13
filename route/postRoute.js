const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')
const { sendStatus } = require('express/lib/response')

// find all posts
router.get('/posts', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.find({}).populate('user')
  res.json(posts)
})
// create a post
router.post('/posts', passport.authenticate('jwt'), async function (req, res) {
  const post = await Post.create({ ...req.body, user: req.user._id })
  await User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
  res.json(post)
})

// delete one post
router.delete('/posts/:id', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(reply =>
      res.json(reply)
    )
})



module.exports = router
