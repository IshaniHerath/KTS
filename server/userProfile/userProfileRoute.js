const express = require('express');
// const auth = require('../../integration/authService');
const userRepository = require('./.').repo;
const router = express.Router();
const pool = require('../connection');

/**
 * @swagger
 *  definitions:
 *   userProfile:
 *       properties:
 *           fullName:
 *               type: string
 *           UniqueId:
 *               type: string
 *           DisplayValue:
 *               type: string
 *           id:
 *               type: integer
 *           CMSheets:
 *             type: array
 *             items:
 *                 $ref: '#definitions/CMSheet'
 *
 *   projectDetails:
 *       properties:
 *           id:
 *               type: integer
 *           ProjectName:
 *               type: string
 *           UniqueId:
 *               type: string
 *           CMSheets:
 *             type: array
 *             items:
 *                 $ref: '#definitions/CMSheets'
 *
 *
 */

router.get('/', async (req, res) => {
  return userRepository.getCourses(req, res);
});

// router.post('/', async (req, res) => {
//   try{
//     const newUser = await pool.query('insert into "userProfile" (name, email, type, isActive) values (\'shashini\', \'hgdfhjs@gmail.com\', 1, true) returning *;');
//     console.log("#################", newUser.rows);
//     await res.json(newUser.rows[0])
//
//   }catch(e){
//     console.log(e.message);
//   }
// });

module.exports = router;
