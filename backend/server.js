import express from  'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import OrderRoutes from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//cookie parser middleware
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Server is running...");   
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', OrderRoutes);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});