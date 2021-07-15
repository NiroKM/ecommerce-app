import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
const result = dotenv.config()
 
if (result.error) {
  throw result.error
}
 
console.log(result.parsed)

connectDB();

const app = express();

app.use(express.json());
 
app.get('/',(req,res)=>{
    res.send('API is running...')
});

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`)); 