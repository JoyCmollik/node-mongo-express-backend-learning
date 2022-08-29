const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');



const register = async (req, res) => {
    // creating user model
    const user = await User.create({ ...req.body });
    // this method is created in the user model using instanceof schema methods
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.username }, token });       
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email });
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    // compare password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid Credentials');
	}

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ user: { name: user.username }, token });
}

module.exports = {
    register, login
};