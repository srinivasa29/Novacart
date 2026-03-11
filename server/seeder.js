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
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
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
    },
    {
        name: 'Sonic Zen Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        description: 'Next-generation noise cancellation with lossless audio fidelity.',
        brand: 'NovaAudio',
        category: 'Electronics',
        price: 350,
        countInStock: 25,
        rating: 4.8,
        numReviews: 42
    },
    {
        name: 'Aurora Handbag',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
        description: 'Exquisite leather craftsmanship with signature celestial hardware.',
        brand: 'Luxe Wear',
        category: 'Fashion',
        price: 950,
        countInStock: 12,
        rating: 4.9,
        numReviews: 18
    },
    {
        name: 'Lumina Desk Lamp',
        image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&q=80',
        description: 'Architectural lighting with adjustable color temperature and intensity.',
        brand: 'Modern Home',
        category: 'Home Decor',
        price: 220,
        countInStock: 20,
        rating: 4.6,
        numReviews: 24
    },
    {
        name: 'Elysian Skincare Set',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
        description: 'Pure botanical extracts for a radiant, age-defying complexion.',
        brand: 'NovaBeauty',
        category: 'Beauty',
        price: 180,
        countInStock: 30,
        rating: 4.7,
        numReviews: 35
    },
    {
        name: 'Matrix Mechanical Keyboard',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80',
        description: 'Ultra-responsive switches with customizable RGB and aluminum frame.',
        brand: 'NovaTech',
        category: 'Electronics',
        price: 280,
        countInStock: 15,
        rating: 4.8,
        numReviews: 50
    },
    {
        name: 'Zenith Smart Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
        description: 'Professional grade 4K imaging with AI-driven tracking.',
        brand: 'NovaTech',
        category: 'Electronics',
        price: 450,
        countInStock: 8,
        rating: 4.9,
        numReviews: 12
    },
    {
        name: 'Nordic Coffee Table',
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80',
        description: 'Minimalist solid oak design with a natural matte finish.',
        brand: 'Modern Home',
        category: 'Home Decor',
        price: 580,
        countInStock: 6,
        rating: 4.7,
        numReviews: 10
    },
    {
        name: 'Ethereal Pearl Necklace',
        image: 'https://images.unsplash.com/photo-1535633302703-d47a0561c9d4?w=800&q=80',
        description: 'Hand-picked freshwater pearls with a 24k gold clasp.',
        brand: 'Luxe Wear',
        category: 'Fashion',
        price: 420,
        countInStock: 15,
        rating: 4.8,
        numReviews: 22
    },
    {
        name: 'Nova Pro Laptop',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
        description: 'The ultimate power machine for creators and engineers.',
        brand: 'NovaTech',
        category: 'Electronics',
        price: 1899,
        countInStock: 12,
        rating: 4.9,
        numReviews: 31
    },
    {
        name: 'Sculptural Marble Vase',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80',
        description: 'Solid Carrara marble carved into a flowing, organic form.',
        brand: 'Modern Home',
        category: 'Home Decor',
        price: 340,
        countInStock: 8,
        rating: 4.7,
        numReviews: 14
    },
    {
        name: 'Midnight Bloom Perfume',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
        description: 'A dark, enchanting fragrance with notes of rare jasmine and cedar.',
        brand: 'NovaBeauty',
        category: 'Beauty',
        price: 125,
        countInStock: 40,
        rating: 4.9,
        numReviews: 56
    },
    {
        name: 'Knit Merino Sweater',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
        description: 'Ethically sourced Merino wool for warmth without the weight.',
        brand: 'Urban Core',
        category: 'Fashion',
        price: 160,
        countInStock: 25,
        rating: 4.6,
        numReviews: 28
    },
    {
        name: 'Quantum Wired Mouse',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
        description: 'Zero-latency gaming mouse with 25k DPI sensor.',
        brand: 'NovaTech',
        category: 'Electronics',
        price: 85,
        countInStock: 50,
        rating: 4.8,
        numReviews: 89
    },
    {
        name: 'Ceramic Pour-Over Kit',
        image: 'https://images.unsplash.com/photo-1544485549-33f73602fc52?w=800&q=80',
        description: 'Master the art of coffee with our artisanal ceramic dripper.',
        brand: 'Modern Home',
        category: 'Home Decor',
        price: 65,
        countInStock: 20,
        rating: 4.5,
        numReviews: 12
    },
    {
        name: 'Essential White Sneakers',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
        description: 'Premium calfskin leather sneakers for a timeless look.',
        brand: 'Urban Core',
        category: 'Fashion',
        price: 180,
        countInStock: 18,
        rating: 4.7,
        numReviews: 43
    },
    {
        name: 'Holographic Desk Mat',
        image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=800&q=80',
        description: 'Protect your desk with a future-forward iridescent finish.',
        brand: 'NovaTech',
        category: 'Electronics',
        price: 45,
        countInStock: 100,
        rating: 4.4,
        numReviews: 67
    },
    {
        name: 'Suede Laptop Sleeve',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
        description: 'Soft genuine suede lining to keep your tech scratch-free.',
        brand: 'Luxe Wear',
        category: 'Fashion',
        price: 75,
        countInStock: 30,
        rating: 4.8,
        numReviews: 15
    }
];

const importData = async () => {
    console.log('Seeder process started...');
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
