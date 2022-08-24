const Product = require('../models/product');




const getAllProductsStatic = async(req, res) => {
    const search = 'a';
    const products = await Product.find({}).select('name price').limit(4); 
    res.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async(req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
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

    // if any numeric filters are applied, they are handled with particular ways
    if(numericFilters) {
        // mapping user friendly operators into mongodb understandable formats
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        
        const regEx = /\b(<|>|>=|=|<|<=)\b/g; // can be found in stackOverflow
        
        // replacing human understandable operators with mongo operators using regEx
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
        console.log(filters);
        const options = ['price', 'rating'];
        // splitting filters with comma first - looping through each item to get their key pair value
        filters = filters.split(',').forEach((item) => {
            // destructuring splitted array where we get three values in the returned array
            // 'price-$gt-40' : [price, $gt, 40]
            const [field, operator, value] = item.split('-');

            // if the field exists in our options, thus being added into queryObj
            if(options.includes(field)) {
                queryObj[field] = {[operator] : Number(value)};
            }
        })
        console.log(queryObj);
    }

    let result = Product.find(queryObj);

    // sorting queries
    if(sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt'); // by default sort them upon their creation time
    }

    // selecting fields only which will be sent
    if (fields) {
		const fieldsList = fields.split(',').join(' ');
		result = result.select(fieldsList);
	}
 
    // pagination codes
    const page = Number(req.query.page) || 1; // initial value is 1
    const limit = Number(req.query.limit) || 10; // by default we send 10 items, if not configured

    const skip = (page - 1) * limit; // say page is 4, so we skip (4-1) * 10 = 30 items
    result = result.skip(skip).limit(limit);

    // final approach - await to get the final object
    const products = await result;

    res.status(200).json({products, nbHits: products.length});
}

module.exports = {getAllProductsStatic, getAllProducts};