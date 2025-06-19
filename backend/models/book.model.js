import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true, 
    },
    image: {
        type: String,
        required: true,
    },
},
{
    timestamps: true // Automatically add createdAt and updatedAt fields
});

const Book = mongoose.model('Book', bookSchema);
export default Book;