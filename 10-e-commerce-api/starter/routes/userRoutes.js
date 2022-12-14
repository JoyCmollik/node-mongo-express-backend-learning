const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	makeAdmin,
	updateUser,
	updateUserPassword,
} = require('../controllers/userController');

router.route('/').get(authenticateUser, authorizePermissions('admin', 'user'), getAllUsers);

router.route('/showMe').get(authenticateUser, showCurrentUser);

router.route('/updateUser').post(authenticateUser, updateUser);

router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

router.route('/makeAdmin').post(authenticateUser, makeAdmin);

router.route('/:id').get(getSingleUser); // always keep the params route at the end

module.exports = router;
