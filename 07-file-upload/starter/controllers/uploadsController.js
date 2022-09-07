const path = require('path');
const StatusCodes = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImageLocal = async (req, res) => {
    // check if the file exists
    if(!req.files) {
        throw new CustomError.BadRequestError('No File Uploaded');
    }
    const productImage = req.files.image;
    
    // check format
    if(!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please Upload Image');
    }

    // check size
    const maxSize = 1024 * 1024;

    if(productImage.size > maxSize) {
        throw new CustomError.BadRequestError('Please upload image smaller 1KB');
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
    await productImage.mv(imagePath); // to move the image

    return res.status(StatusCodes.OK).json({image: {src: `/uploads/${productImage.name}`}});
}

const uploadProductImage = async ( req, res ) => {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'file-upload'
    });
    console.log(result);

    fs.unlinkSync(req.files.image.tempFilePath); // if the image is stored properly, we are not storing temporarily

    res.status(StatusCodes.OK).json({ image : { src: result.secure_url } });
}

module.exports = {
    uploadProductImage
};