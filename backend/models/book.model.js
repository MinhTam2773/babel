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
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Fantasy', 'Mystery', 'Romance'],
        default: 'Fiction',
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