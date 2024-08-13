import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors"
import userRoute from './routes/user.route.js';
import productRoute from './routes/product.route.js';
import orderRoute from './routes/order.route.js';
import profileRoute from './routes/profile.route.js';
import paymentRoute from './routes/payment.route.js';
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use('/api/v1/user', userRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/payment', paymentRoute);

export { app };
