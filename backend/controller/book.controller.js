import Book from '../models/book.model.js'; // Import the Product model
import mongoose from 'mongoose'; // Import mongoose to validate ObjectId

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find(); // find all products in the database
        res.status(200).json({ success: true, data: books });
    } catch (error) {
        console.error("Error in getting books", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const getBookById = async (req, res) => {
    const { id } = req.params; // get the id from the url
    try {
        const book = await Book.findById(id); // find all products in the database
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        console.error("Error in getting books", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const createBook = async (req, res) => {
    const book = req.body; //user will send this data

    if (!book.name || !book.price || !book.image) {
        return res.status(400).json({ success: false, message: 'Please fill all the fields' });
    }

    const newBook = new Book(book)

    try {
        await newBook.save();
        res.status(201).json({ success: true, data: newBook });
    } catch (error) {
        console.error("Error in create product", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const updateBook = async (req, res) => {
    const { id } = req.params; // get the id from the url
    const book = req.body; // user will send this data

    if (!mongoose.Types.ObjectId.isValid(id)) { // check if the id is valid
        return res.status(404).json({ success: false, message: 'Invalid product ID' });
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true }); // update the product in the database
        res.status(200).json({ success: true, data: updatedBook });
    } catch (error) {
        console.error("Error in update product", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const deleteBook = async (req, res) => {
    const { id } = req.params; // get the id from the url

    if (!mongoose.Types.ObjectId.isValid(id)) { // check if the id is valid
        return res.status(404).json({ success: false, message: 'Invalid book ID' });
    }

    try {
        await Book.findByIdAndDelete(id); // delete the product from the database
        res.status(200).json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
        console.error("Error in delete product", error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export const getFeaturedBook = async (req, res) => {
    try {
        const book = await Book.findOne(); // Gets first book in database
        res.json({ success: true, data: book });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};