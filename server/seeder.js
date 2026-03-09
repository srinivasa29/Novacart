const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const products = [
    {
        name: 'Platinum Chronograph',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        description: 'A masterpiece of Swiss engineering featuring a platinum case and sapphire crystal.',
        brand: 'NovaCart Elite',
        category: 'Electronics',
        price: 2499,
        countInStock: 10,
        rating: 4.8,
        numReviews: 12
    },
    {
        name: 'Silk Evening Gown',
        image: 'https://images.unsplash.com/photo-1539109132314-3477524c8b03?w=800&q=80',
        description: 'Hand-stitched Italian silk gown for the most exclusive occasions.',
        brand: 'Luxe Wear',
        category: 'Fashion',
        price: 1800,
        countInStock: 7,
        rating: 4.9,
        numReviews: 8
    },
    {
        name: 'Velvet Lounge Chair',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
        description: 'Premium ergonomic design wrapped in deep emerald velvet.',
        brand: 'Modern Home',
        category: 'Home Decor',
        price: 1200,
        countInStock: 5,
        rating: 4.7,
        numReviews: 15
    }
];

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            isAdmin: true
        });

        const sampleProducts = products.map((product) => {
            return { ...product, user: createdUser._id };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
