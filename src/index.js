require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const mongoose = require("mongoose");
const connectDB = require('../src/config/dbConnection');
const v1AuthRoutes = require('./v1/routes/authRoutes');
const v1RegisterRoutes = require('./v1/routes/registerRoute');
const v1HouseRoutes = require('./v1/routes/houseRoutes');
const v1TenantRoutes = require('./v1/routes/tenantRoutes');
const v1PaymentRoutes = require('./v1/routes/paymentRoutes');
const v1ContactUsRoutes = require('./v1/routes/contactUsRoutes');
const v1RegionRoutes = require('./v1/routes/regionRoutes');
const v1LandLordRoutes = require('./v1/routes/landLordDetailsRoutes');
const v1CountRoutes = require('./v1/routes/countRoutes');

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

// middleware for json 
app.use(express.json());


app.use('/api/v1/register', v1RegisterRoutes);
app.use('/api/v1/auth', v1AuthRoutes);
app.use("/api/v1/house", v1HouseRoutes);
app.use("/api/v1/tenant", v1TenantRoutes);
app.use("/api/v1/region", v1RegionRoutes);
app.use("/api/v1/landlord", v1LandLordRoutes);
app.use("/api/v1/payment", v1PaymentRoutes);
app.use("/api/v1/contact", v1ContactUsRoutes);
app.use("/api/v1/count", v1CountRoutes);

__dirname = path.resolve('./');
app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
);

app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message });
});

let PORT;

// Check environment
if (process.env.NODE_ENV === 'development') {
  PORT = process.env.DEV_PORT
}

if (process.env.NODE_ENV === 'production') {
  PORT = process.env.PROD_PORT
}
else{
  PORT = process.env.PROD_PORT
}

mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  app.listen(PORT, () => console.log(`Server running on ${PORT} ...`));
});