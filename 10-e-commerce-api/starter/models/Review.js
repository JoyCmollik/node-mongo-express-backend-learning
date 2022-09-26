const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: [true, 'Please provide rating value'],
	},
	title: {
		type: String,
		trim: true,
		required: [true, 'Please provide review title'],
		maxlength: 100,
	},
	comment: {
		type: String,
		required: [true, 'Please provide review text'],
	},
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
}, { timestamps: true });

// this making sure the user can give review only once per products
ReviewSchema.index({ product: 1, user: 1 }, {unique: true});

module.exports = mongoose.model('Review', ReviewSchema)