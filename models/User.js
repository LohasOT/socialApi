const { Schema, model } = require('mongoose');

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'post',
    }],
    notes: [{
      type: Schema.Types.ObjectId,
      ref: 'note'
    }],
    friends: [{ type: Schema.Types.ObjectId, 
    ref: 'Friend' 
    }]
  }, { timestamps: true })

User.virtual('friendCount').get(function () {
  return this.friends.length;
});

User.plugin(require('passport-local-mongoose'))

module.exports = model('user', User)

