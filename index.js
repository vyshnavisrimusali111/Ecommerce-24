import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import morgan from 'morgan';
import category from './routes/category.js';
import product from "./routes/product.js";
import cors from "cors"
dotenv.config();

const app = express();

//db
mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("DB connected"))
.catch((err)=> console.log("DB Error",err));


//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());



//router middleware
app.use('/api', authRoutes);
app.use("/api", category);
app.use("/api", product);



const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
})