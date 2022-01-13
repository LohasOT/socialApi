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
        ref: 'Post',
    }],
    notes: [{
      type: Schema.Types.ObjectId,
      ref: 'note'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
  }, { timestamps: true })

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

User.plugin(require('passport-local-mongoose'))

module.exports = model('user', User)

