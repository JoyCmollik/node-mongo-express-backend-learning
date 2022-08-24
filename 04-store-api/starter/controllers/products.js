const Product = require('../models/product');




const getAllProductsStatic = async(req, res) => {
    const search = 'a';
    const products = await Product.find({}).select('name price');
    res.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async(req, res) => {
    const { featured, company, name, sort, fields } = req.query;
    const queryObj = {};


    // normal queries 
    if(featured) {
        queryObj.featured = featured === 'true' ? true : false;
    }

    if(company) {
        queryObj.company = company;
    }

    if(name) {
        queryObj.name = { $regex: name, $options: 'i' }; 
    }

    let result = Product.find(queryObj);

    // sorting queries
    if(sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt'); // by default sort them upon 
    }

    // selecting fields only which will be sent
    if (sort) {
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	}

    const products = await result;

    res.status(200).json({products, nbHits: products.length});
}

module.exports = {getAllProductsStatic, getAllProducts};