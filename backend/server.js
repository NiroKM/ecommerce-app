import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import productRoute from './routes/productRoute.js'

const result = dotenv.config()
 
if (result.error) {
  throw result.error
}
 
console.log(result.parsed)

connectDB();

const app = express();
 
app.get('/',(req,res)=>{
    res.send('API is running...')
});

app.use('/api/products', productRoute);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`)); 