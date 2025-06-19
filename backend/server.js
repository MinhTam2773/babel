import express from 'express';
import { connectDB } from './config/db.js';
import bookRoutes from './routes/book.route.js'; // Import the product routes

const app = express();
const PORT = process.env.PORT || 5000; // set the port to 5000 or the port from the environment variable

app.use(express.json()); // allow us to accept JSON data in the req.body

app.use("/api/books", bookRoutes); // use the product routes

app.listen(PORT, () => { // start the server on port 5000, and database connection
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
})

