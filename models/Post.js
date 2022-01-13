const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

module.exports = model('post', Post)

