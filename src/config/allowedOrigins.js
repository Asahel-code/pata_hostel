require('dotenv').config();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.APP_DEV_URL,
    process.env.APP_PROD_URL,
];

module.exports = allowedOrigins;