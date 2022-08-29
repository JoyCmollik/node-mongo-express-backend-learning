const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Not Authorized To Access');
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        // attach the user to the job routes
        req.user = {userId: payload.userId, name: payload.name};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not Authorized To Access');
    }
}

module.exports = authenticationMiddleware;