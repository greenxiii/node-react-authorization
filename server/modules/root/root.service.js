const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports = {
  login: async (request, response, next) => (
    new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user, info) => {
        if (err) reject(err);
        if (!user) reject('User not found');

        request.logIn(user, (err) => {
          if (err) reject(err);

          resolve(user);
        });
      })(request, response, next);
    })
  ),
  signUp: async({ name, email, password }) => (
    new Promise((resolve, reject) => {
      User.findOne({email: email })
      .then((user) => {
        if (user) {
          reject('User is already exists');
        }

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hashedPass) => {
            if (err) throw err;

            const newUser = new User({
              name,
              email,
              password: hashedPass,
            });

            resolve(newUser.save());
          });
        });
      });
    })
  ),
};
