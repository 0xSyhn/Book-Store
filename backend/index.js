import express from "express";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const PORT = 5555;

//MIDDLEWARE FOR PARSING REQUEST BODY
app.use(express.json());

//MIDDLEWARE TO HANDLE CORS POLICY
app.use(cors());

// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['POST','PUT','GET','DELETE'],
//     allowedHeaders:['Content-Type'],
// })
// );

app.get('/',(request, response)=>{
    console.log(request);
    return response.status(200).send('Welcome to my first MERN project.')
});

app.use('/books',booksRoute)

mongoose
   .connect(process.env.mongoDBURL)
   .then(()=>{
    console.log("App connected to database.");
    app.listen(PORT,()=>{
        console.log(`App is listening to port ${PORT}`)
    });
   })
   .catch((error)=>{
    console.log(error);
   })