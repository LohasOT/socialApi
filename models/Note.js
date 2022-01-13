const { Schema, model } = require('mongoose');

const Note = new Schema(
  {
    body: {
      type: String,
      required: true,
      maxlength: 280
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'post',
      required: true
    }
  }, { timestamps: true })

module.exports = model('note', Note)
