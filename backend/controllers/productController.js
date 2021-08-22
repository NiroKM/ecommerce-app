import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product);
    } else {
        res.status(404)
        throw new Error('Product Not Found!');
    }
})

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private && admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        product.remove()
        res.send({ message: 'product removed' })
    } else {
        res.status(404)
        throw new Error('product not found')
    }
})


// @desc create product
// @route POST /api/products/
// @access Private && admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc update product
// @route PUT /api/products/:id
// @access Private && admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, image, brand, category, countInStock, numReviews, description } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.numReviews = numReviews
        product.description = description

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)


    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


// @desc create product review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const createdReview = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if (createdReview) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


export { getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview }