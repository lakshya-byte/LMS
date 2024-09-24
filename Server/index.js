import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './database/db.js';
import Razorpay from 'razorpay'
import cors from 'cors'

dotenv.config();

export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.key_secret,

})


const app = express()
//using middlewares

app.use(express.json())
app.use(cors())



const port = process.env.PORT

app.get('/', (req, res) => {
    res.send("server is working")
})

app.use("/uploads", express.static("uploads"))

//import routes
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js'
import adminRoutes from './routes/admin.routes.js'

//using routes
app.use('/api', userRoutes)
app.use('/api', courseRoutes)
app.use('/api', adminRoutes)

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
    connectDb()
})

