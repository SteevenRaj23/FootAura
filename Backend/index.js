const express = require('express')
const cors =require('cors')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')
const morgan = require('morgan');

dotenv.config()
const app = express()

//DB
connectDB()

//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


//Routes
app.use('/api/auth',require('./routes/authRoutes'))
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})