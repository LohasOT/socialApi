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
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'post',
    }],
    note: [{
      type: Schema.Types.ObjectId,
      ref: 'note'
    }],
    friends: [{ type: Schema.Types.ObjectId, 
    ref: 'user' 
    }]
  }, { timestamps: true })

User.virtual('friendCount').get(function () {
  return this.friends.length;
});

User.plugin(require('passport-local-mongoose'))

module.exports = model('user', User)

