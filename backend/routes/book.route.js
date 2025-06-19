import express from 'express';
import { getBooks, createBook, updateBook, deleteBook, getFeaturedBook} from '../controller/book.controller.js'; // Import the getProducts function

const router = express.Router();

router.get("/", getFeaturedBook); // get all products
router.post("/create", createBook);
router.put("/:id", updateBook); // update a product
router.delete("/:id",  deleteBook); // delete a product
router.get("/library", getBooks); // get all books

export default router;