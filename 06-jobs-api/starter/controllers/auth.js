const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');



const register = async (req, res) => {
    // creating user model
    const user = await User.create({ ...req.body });
    // this method is created in the user model using instanceof schema methods
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });       
}

const login = async (req, res) => {
    res.send('login user');
}

module.exports = {
    register, login
};