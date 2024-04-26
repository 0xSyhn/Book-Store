import express from 'express';
import {Book} from '../models/bookModel.js'

const router = express.Router();


//Route to save a new book
router.post('/',async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title : request.body.title,
            author: request.body.author,
            publishYear:request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

// Route to get all books from the database
router.get('/',async (request,response)=>{ 
    try{
        const book = await Book.find();

        return response.status(200).json(book);

    }catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});


router.get('/:id',async (request,response)=>{
    try{

        const {id} = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);

    }catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});

//TO UPDATE A BOOK
router.put('/:id', async(request,response)=>{
    try{
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:'Send all required fields: title, author, publishYear'
            });
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        
        if(!result){
            return response.status(404).json({message: 'Book not Found'});
        }
        return response.status(200).send({message:'Update Successful'});

    }catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
})

//TO DELETE A BOOK
router.delete('/:id',async(request,response)=>{
    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'Book not Found'});
        }
        return response.status(200).send({message:'Deletion Successful'});


    }catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
})

export default router;