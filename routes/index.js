//this file will do routing for us
//Routing is the process of selecting a path for traffic(data we are passing or fetching) in a network or 
//between or across multiple networks.

const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()
const Product = require('../models/product')
//we send a message to our server (makes a GET request)
router.get('/', (req, res) => {
    res.render('login')
})

//routing to another page section on our port
router.get('/homepage', async (req, res) => {
    const products = await Product.find({ Featured: true }).exec((err, productsData) => {
        if (productsData) {
            console.log(productsData)
            res.render('homepage', { data: productsData })
        }
    });

})

//Adding new user 
//on route POST/ adduser (new user registration)
router.get('/signup', (req, res) => {
    res.render("signup")
})


//Page for adding products with form
router.get('/add', (req, res) => {
    res.render("add")
})

//page for signing up
router.post('/signup', actions.addNew)

//page for login authetication
router.post('/authenticate', actions.authenticate)

//extra
router.post('/login', actions.getinfo)

//page for login UI
router.get('/login', (req, res) => {
    res.render("login")
})

//endpoint for adding product
router.post('/addproduct', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//displaying all products
router.get('/showproducts', async (req, res) => {
    try {
        const products = await Product.find({}).exec((err, productsData) => {
            if (productsData) {
                console.log(productsData)
                res.render('allproducts', { data: productsData })
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})


//end point for products less than a certain price
router.get('/showproductsless/:price', async (req, res) => {
    try {
        const { price } = req.params;
        const products = await Product.find({ Price: { $lt: parseInt(price) } });
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}),


//end point for products having a rating  greater than a ceratin number

    router.get('/showproductsmore/:rating', async (req, res) => {
        try {
            const { rating } = req.params;
            const products = await Product.find({ Rating: { $gt: parseFloat(rating) } });
            res.status(200).json(products);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    })

    //end point for only showing featured products
router.get('/showfeaturedproducts', async (req, res) => {
    try {
        const { price } = req.params;
        const products = await Product.find({ Featured: true });
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

//end point for updating product info
router.put('/updateproduct/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.update({ ProductID: id }, req.body);
        if (!product) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}),

//end point for deleting a product 
    router.delete('/deleteproduct/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.deleteOne({ ProductID: id }, req.body);
            if (!product) {
                return res.status(404).json({ message: `cannot find any product with ID ${id}` })
            }
            res.status(200).json(product);


        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    })

module.exports = router