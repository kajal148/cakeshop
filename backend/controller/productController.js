import asyncHandler from "../middleware/asyncHandler.js";
import productModel from "../models/productModel.js";


// @desc get all products
// @route GET api/products/
// @access Public
const getProducts = asyncHandler( async(req, res) => {
    const products = await productModel.find({});

    return res.json(products);
})


// @desc fetch a product
// @route GET api/products/:id
// @access Public
const getProductById = asyncHandler (async (req, res) => {
    const product = await productModel.findById(req.params.id);

    if(product){
        return res.json(product);
    }else{
        throw new Error('Product not found');
    }
});

export {
    getProducts,
    getProductById
}