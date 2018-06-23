const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
    // create user takes in the username and password and saves a user.
  // our pre save hook should kick in here saving this user to the DB with an encrypted password.
  
  const { username, password } = req.body;

  User.create({username, password })
    .then(({ username }) => {
      res.status(201).json({ username })
    })
    .catch(err => {
      res.status(500).json(err)
    })
};

module.exports = {
  createUser
};
