const useNotFound = require('../../middlewares/useNotFound');
const RootService = require('./root.service');


module.exports = {
  login: async function (request, response, next) {
    RootService.login(request, response, next).then(user => {
      response.status(200).json({ success: true, data: user });
    }).catch(err => {
      response.status(401).json({ success: false, data: err });
    });
  },
  signUp: async function (request, response) {
    RootService.signUp(request.body).then(newUser => {
      response.status(200).json({ success: true, data: newUser });
    }).catch(err => {
      response.status(401).json({ success: false, data: err });
    });
  },
  notFound: useNotFound,
};
