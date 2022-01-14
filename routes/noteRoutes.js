const router = require('express').Router()
const { Post, Note, User } = require('../models')
const passport = require('passport')

// get all notes
router.get('/notes', passport.authenticate('jwt'), async function (req, res) {
  const notes = await Note.find({}).populate('user')
  res.json(notes)
})

// post one note
router.post('/notes', passport.authenticate('jwt'), async function (req, res) {
  const note = await Note.create({ ...req.body, user: req.user._id, post: req.body.postid })
  await Post.findByIdAndUpdate(req.body.postid, { $push: { notes: note._id } })
  await User.findByIdAndUpdate(req.user._id, { $push: { notes: note._id } })
  res.json(note)
})

// edit one note
router.put('/notes/:id', passport.authenticate('jwt'), async function (req, res) {
  const note = await Note.findByIdAndUpdate(req.params.id,{ $set: req.body } )
  res.json(note)
})

// delete one note
router.delete('/notes/:id', passport.authenticate('jwt'), (req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(reply =>
      res.json(reply)
    )
})
module.exports = router
