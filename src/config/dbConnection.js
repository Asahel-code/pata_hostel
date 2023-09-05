require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
    let dbURI;

    if (process.env.NODE_ENV === 'development') {
        dbURI = process.env.DATABASE_DEV_URL
    }

    if (process.env.NODE_ENV === 'production') {
        dbURI = process.env.DATABASE_PROD_URL
    }
    
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(dbURI, { useNewUrlParser: true });
    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB