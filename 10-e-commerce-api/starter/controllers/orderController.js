const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const Order = require('../models/Order');
const { checkPermissions } = require('../utils');

const createOrder = async (req, res) => {
	res.status(StatusCodes.OK).json({ msg: 'create an order api' });
};
const getAllOrders = async (req, res) => {
	res.status(StatusCodes.OK).json({ msg: 'get all orders api' });
};
const getSingleOrder = async (req, res) => {
	res.status(StatusCodes.OK).json({ msg: 'get single orders api' });
};
const getCurrentUserOrders = async (req, res) => {
	res.status(StatusCodes.OK).json({ msg: 'get current user orders api' });
};
const updateOrder = async (req, res) => {
	res.status(StatusCodes.OK).json({ msg: 'update an order api' });
};

module.exports = {
	getAllOrders,
	getSingleOrder,
	getCurrentUserOrders,
	createOrder,
	updateOrder,
};
