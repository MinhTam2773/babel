import express from 'express';
import path from 'path';
import { connectDB } from './config/db.js';
import bookRoutes from './routes/book.route.js'; // Import the product routes

const app = express();
const PORT = process.env.PORT || 5000; // set the port to 5000 or the port from the environment variable

const __dirname = path.resolve(); // get the current directory name

app.use(express.json()); // allow us to accept JSON data in the req.body

app.use("/api/books", bookRoutes); // use the product routes

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist'))); // serve the static files from the frontend build folder

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")); // serve the index.html file for any other route
    })
} 

app.listen(PORT, () => { // start the server on port 5000, and database connection
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
})

