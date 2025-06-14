import express from "express";
import {PORT,mongoDBURL} from "./config.js";
//import config from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModels.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
const app=express();
//middleware for parsing request body
app.use(express.json());

app.use(cors());

//Middleware  for handling cors policy
//option 1:Allow All origins with Default of Cors(*)
/* app.use(cors());
//option 2:allow custom origins
app.use(
    cors({
        origin:'http://localhost:3000',
        methods:['GET','POST','PUT','DELETE'],
        allowHeaders:['Content-Type'],
    })
) */
 app.get('/',(request,response)=>{
  console.log(request)
  return response.status(200).send('WELCOME TO MERNSTACK DEV')
 });

app.use('/books',booksRoute);






mongoose
.connect(mongoDBURL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`App is Listening to port:${PORT}`);
    });
console.log('App connected to database');
})
.catch((error)=>{
    console.log(error.message);
})

 