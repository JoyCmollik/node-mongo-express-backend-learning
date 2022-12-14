const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createTokenUser, attachCookiesToResponse } = require('../utils');

const getAllUsers = async (req, res) => {
	const users = await User.find({ role: 'user' }).select('-password');
	res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
	const user = await User.findOne({ _id: req.params.id }).select('-password');
	if (!user) {
		throw new CustomError.NotFoundError(
			`No user with id: ${req.params.id}`
		);
	}
	res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
	res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
	const { email, name } = req.body;

	if (!email || !name) {
		throw new CustomError.BadRequestError('Please provide both values');
	}

	const user = await User.findOneAndUpdate(
		{ _id: req.user.userId },
		{ email, name },
		{ new: true, runValidators: true }
	);  

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({res, user: tokenUser});

	res.status(StatusCodes.OK).json({ user: tokenUser });
};

const makeAdmin = async (req, res) => {
	const { userId } = req.user;
	const { email } = req.body;
	
	const admin = await User.findOne({ _id: userId });

	if(!admin) {
		throw new CustomError.UnauthorizedError('Not authorized');
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new CustomError.BadRequestError(`No user with this email ${email}`);
	}

	await User.findOneAndUpdate(
		{ _id: user._id },
		{ role: 'admin' },
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(StatusCodes.OK).json({ msg: 'Successfully updated role admin' });
}

const updateUserPassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	if (!oldPassword || !newPassword) {
		throw new CustomError.BadRequestError('Please provide both values');
	}

	const user = await User.findOne({ _id: req.user.userId });

	const isPasswordCorrect = await user.comparePassword(oldPassword);

	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError('Invalid Credentials');
	}
	user.password = newPassword;

	await user.save();

	res.status(StatusCodes.OK).json({ msg: 'Password Updated' });
};

module.exports = {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	makeAdmin,
	updateUser,
	updateUserPassword,
};
