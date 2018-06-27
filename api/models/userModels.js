const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  return bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      return next();
    })
    .catch(err => {
      return next(err);
    });
});

UserSchema.methods.checkPassword = function(plainTextPW, callBack) {
  console.log(plainTextPW, this.password);
  bcrypt.compare(plainTextPW, this.password)
  .then(hashMatch => {
    callBack(hashMatch);
  })
  .catch(err => {
    console.log(err);
  })
};

module.exports = mongoose.model('User', UserSchema);
