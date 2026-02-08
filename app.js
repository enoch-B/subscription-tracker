import express from 'express'
import { PORT } from './config/env.js';
import userRoutes from './routes/user.routes.js'
import subscriptionRoutes from './routes/subscription.routes.js'
import authRoutes from './routes/auth.routes.js'
import connectToDatabase from './database/mongodb.js';

const app=express();

app.use(express.json());

//Routes
app.use('api/v1/auth', authRoutes)
app.use('api/v1/users', userRoutes);
app.use('api/v1/subscriptions', subscriptionRoutes)


app.get('/health',(req, res)=>{
   res.send("Welcome to Subscription Tracker API")
})

app.listen(PORT,()=>{
    console.log(`Subscription tracker App is running on http://localhost:${PORT}`)
   connectToDatabase();

})

export default app;