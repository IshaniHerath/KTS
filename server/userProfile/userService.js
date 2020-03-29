/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-destructuring */
// const Sequelize = require('sequelize');
// const sequelize = require('../../models').sequelize;

const userRepository = require('./userRepository');

const userService = {};

/**
 * Create project.
 * @returns {array} project details object
 * @param project
 * @param user
 * @param userName
 */
userService.createProject = async (project, user, userName) => {
  let result = null;
  try {
    if (
      project.ProjectName &&
      project.CustomerId &&
      project.OPID
    ) {

      const uniqueId = `${division.Code}-${customer.Code}-${project.OPID}`;
      project.UniqueId = uniqueId;
      project.CreatedUser = user;
      project.UpdatedUser = user;
      const createdProject = await userRepository.create(project);

    }
  } catch (error) {
    // loggerService.write('Error', 'Error while creating a Project', error);
    result = Promise.reject(new Error('Error'));
  }
  return result;
};

module.exports = userService;
