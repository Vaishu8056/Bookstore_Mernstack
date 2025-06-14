import express from 'express';
import{Book} from '../models/bookModels.js';
const router=express.Router();






//route for save a new book
router.post('/',async(request,response)=>{
    try{
        const { title, author, publishYear } = request.body;
       if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
       ){
        return response.status(400).send({
            message:'send all required fields:title,author,publishYear',
        });
       }
      const newBook={
        title:request.body.title,
        author:request.body.author,
        publishYear:request.body.publishYear,
      };
      const book=await Book.create(newBook);
      return response.status(201).send(book);
    }
    catch(error){
console.log(error.message);
response.status(500).send({message:error.message});
    }
});
/* app.listen(PORT,()=>{
    console.log(`App is Listening to port:${PORT}`);
}); */
//route for get all the books from database
router.get('/',async(request,response)=>{
try{
    const books=await Book.find({});

    return response.status(200).json({
        count:books.length,
        data:books
    });
} catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message});
}
});









router.get('/:id',async(request,response)=>{
    try{
     const {id}=request.params;



     const book=await Book.findById(id);
     //console.log(books);
    return response.status(200).json(book);
    }catch(error){
    console.log(error.message);
    response.status(500).send({message:error.message})
    }




}
);

/* const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: { type: Number, required: true },
});

export const Book = mongoose.model('Book', bookSchema); */


//route for update a book
router.put('/:id',async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
           ){
            return response.status(400).send({
                message:'send all required fields:title,author,publishYear',
            });
           }

const {id}=request.params;
const result=await Book.findByIdAndUpdate(id,request.body);
if(!result){
    return response.status(404).json({message:'Book not found'});
}
return response.status(200).send({message:'Book updated successfully'});
}
    catch(error){
      console.log(error.message);
      response.status(500).send({message:error.message});
    }
});

//route for delete a book
router.delete('/:id',async(request,response)=>{
    try{
        const {id}=request.params;
        const result=await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:'Book not found'});
        }
        return response.status(200).send({message:'Book deleted successfully'});
    }
    catch(error){
      console.log(error.message);
      response.status(500).send({message:error.message});
    }
});

/* router.get('/', async (request, response) => {
    try {
        const books = await Book.find().select('+createdAt +updatedAt');;
        response.status(200).json({ success: true, data: books });
    } catch (error) {
        response.status(500).json({ success: false, message: error.message });
    }
}); */











export default router;