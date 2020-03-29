/* eslint-disable prefer-destructuring */
const userService = require('./userService');

// const loggerService = require('../../integration/loggerService');

const controller = {};

/**
 * create - Create a new User
 * @returns {object}  Created User
 * @param req
 * @param res
 */
controller.createUser = (req, res) => {
  const user = req.body;
  if (req.user && req.user.upn) {
    return userService
      .createProject(user, req.user.upn, req.user.name)
      .then(obj => res.status(201).send(obj))
      // .catch(error => {
      //   loggerService.write(
      //     'Error',
      //     `PROJECT CONTROLLER - Error while Creating Project || USER - ${req.user.name}`,
      //     error
      //   );
      //   error.message === 'Error'
      //     ? res.status(500).send('Internal Server Error')
      //     : res.status(400).send(error.message);
      // });
  }
  return res.status(401).send('Not Authorized');
};

module.exports = controller;
