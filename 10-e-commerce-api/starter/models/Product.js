const mongoose = require('mongoose');




const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Please provide product name'],
			maxlength: [100, 'Name can not be more than hundred characters'],
		},
		price: {
			type: Number,
			required: [true, 'Please provide product price'],
			default: 0,
		},
		description: {
			type: String,
			required: [true, 'Please provide product description'],
			maxlength: [1000, 'Name can not be more than thousand characters'],
		},
		image: {
			type: String,
			default: '/uploads/example.jpg',
		},
		category: {
			type: String,
			required: [true, 'Please provide product category'],
			enum: ['office', 'kitchen', 'bedroom'],
		},
		company: {
			type: String,
			required: [true, 'Please provide product company'],
			enum: {
                values: ['ikea', 'liddy', 'marcos'],
                message: '{VALUE} is not supported'
            },
		},
		colors: {
			type: [String],
			default: ['#222'],
            required: true
		},
		featured: {
			type: Boolean,   
			default: false, 
		},
		freeShipping: {
			type: Boolean,
			default: false,
		},
		inventory: {
			type: Number,
			required: true,
            default: 15 
		},
		averageRating: {
			type: Number,
			max: 5,
			min: 0,
			default: 0,
		},
		numOfReviews: {
			type: Number, 
			default: 0,
		},
		user: {
			type: mongoose.Types.ObjectId,
            ref: 'User',
			required: true,
		},
	},
	{ timestamps: true, toJSON: { virtuals : true}, toObject: { virtuals : true} }
);

// this is a virtual method, being used for getting all the reviews associated with one specified product
ProductSchema.virtual('reviews', {
	ref: 'Review',
	localField: '_id',
	foreignField: 'product',
	justOne: false,
	match: { rating: 5 }
})

/* 
#problem - while removing any product, should also delete associated reviews
#solution - can use remove hook here and access model Review to delete them
*/
ProductSchema.pre('remove', async function(next){
	await this.model('Review').deleteMany({ product: this._id });

	// next();
})


module.exports = mongoose.model('Product', ProductSchema);