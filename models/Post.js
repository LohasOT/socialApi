const { Schema, model } = require('mongoose');

const Post = new Schema({
    body: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    notes: [{
      type: Schema.Types.ObjectId,
      ref: 'note'
    }]
  }, { timestamps: true }
)

Post.virtual('notesCount').get(function() {
  return this.notes.length;
});

module.exports = model('post', Post)

