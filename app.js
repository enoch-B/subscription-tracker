import express from 'express'
import { PORT } from './config/env.js';

const app=express();



app.get('/health',(req, res)=>{
   res.send("Welcome to Subscription Tracker API")
})

app.listen(PORT,()=>{
    console.log(`Subscription tracker App is running on http://localhost:${PORT}`)
})

export default app;