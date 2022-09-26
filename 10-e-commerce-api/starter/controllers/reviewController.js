const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const Review = require('../models/Review');
const Product = require('../models/Product.js');
const { checkPermissions } = require('../utils');

const createReview = async (req, res) => {
    const { product: productId } = req.body;

    // checking if the product exists for which review is written
    const isValidProduct = await Product.findOne({ _id: productId });

    if(!isValidProduct) {
        throw new CustomError.NotFoundError(`No product with id: ${productId}`);
    }

    // checking if already this user submitted review
    const alreadySubmitted = await Review.findOne({ product: productId, user: req.user.userId });

    if(alreadySubmitted) {
        throw new CustomError.BadRequestError('Already submitted review for this product');
    }; 

    req.body.user = req.user.userId;
    const review = await Review.create(req.body);

    res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'get reviews' });
}
const getSingleReview = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'get review' });
}
const updateReview = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'update review' });
}
const deleteReview = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'delete review' });
}

module.exports = {
	createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
};