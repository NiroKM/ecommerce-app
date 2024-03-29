//Seeder Script
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import users from './data/users.js';
import products from './data/products.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        //await Order.deleteMany();
        await Product.deleteMany();
        //await User.deleteMany();
        //console.log('Data Destroyed!');
        
        console.log('Importing Data!');
        //const createdUsers = await User.insertMany(users);
        const adminUserList =await User.find({isAdmin:true})
        const adminUser = adminUserList[0]._id;

        const sampleProducts = products.map(p => {
            return ({ ...p, user: adminUser })
        })
        await Product.insertMany(sampleProducts);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();


        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}