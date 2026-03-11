const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const checkData = async () => {
    try {
        await connectDB();
        const products = await Product.find({});
        console.log(`TOTAL_PRODUCTS:${products.length}`);
        products.forEach(p => console.log(`PRODUCT:${p.name}`));
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkData();
