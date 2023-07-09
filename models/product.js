const mongoose = require('mongoose')


const productSchema = mongoose.Schema(
    {
        ProductID: {
            type: String,
            required: [true, "Please enter a product id"],
            unique: true
        },
        Name: {
            type: String,
            required: [true, "Please enter a product name"],
        },
        Price: {
            type: Number,
            required: [true, "Please enter the product price"],
        },
        Featured: {
            type: Boolean,
        },
        Rating: {
            type: Number,
        },
        Company: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;