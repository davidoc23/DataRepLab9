// Import the necessary modules
const express = require('express');  // Import the Express framework
const app = express();  // Create an Express application
const port = 4000;  // Define the port number on which the server will listen

const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) 
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configure and use the body-parser middleware to handle request data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(bodyParser.json()); // Parse JSON data

// Importing the Mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Async function to connect to the MongoDB database
main().catch(err => console.log(err));

async function main() {
    // Connecting to the MongoDB database using the provided connection string
    await mongoose.connect('mongodb+srv://admin:admin@mongodb.cpyhxs1.mongodb.net/MYDB1?retryWrites=true&w=majority');

    // Use the following connection string if your database has authentication enabled
    //await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');
}

// Defining a Mongoose schema for the 'Davids_Books' collection
const bookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    author: String
})

// Creating a Mongoose model based on the defined schema
const bookModel = mongoose.model('Davids_Books', bookSchema);

// This route handles HTTP PUT requests to update a book with a specific ID
app.put('/api/book/:id', async (req, res) => {
    
    // Log the ID of the book being updated
    console.log("Update: " + req.params.id);

    // Use Mongoose's findByIdAndUpdate to update the book with the specified ID
    // req.params.id: the ID of the book to be updated
    // req.body: the data to be updated, which is expected to be in the request body
    // { new: true }: returns the updated document instead of the original one
    let book = await bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Send the updated book as the response
    res.send(book);
});


// Defining a route that responds with "Hello World!" for a GET request to the root URL ("/")
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route "/api/books" that responds with a personalized message based on JSON data from a POST request
app.post('/api/books', (req, res) => {
    // Logging the request body for debugging purposes
    console.log(req.body);

    // Creating a new document in the 'Davids_Books' collection using data from the POST request
    bookModel.create({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author
    })
    .then(() => {
        // Sending a success message if the book is created successfully
        res.send('Hello, Book Created!');
    })
    .catch(() => {
        // Sending an error message if there's an issue creating the book
        res.send('Hello, Book Not Created!');
    });
});


// Route "/api/books" with a JSON response containing a list of books for a GET request
app.get('/api/books', async(req, res) => 
{
    let books = await bookModel.find({});
    res.json(books);
});

// Define a GET request handler for the '/api/books/:id' endpoint
app.get('/api/book/:id', async (req, res) => {

    // Log the book ID received as a parameter in the request
    console.log(req.params.id);

    // Use the Mongoose model (assumed to be named 'bookModel') to find a book by its ID
    let book = await bookModel.findById(req.params.id);

    // Send the found book as a response to the client
    res.send(book);

})

//Delete a item from the database
app.delete('/api/book/:id', async(req, res)=>{
    console.log("Delete: " + req.params.id);

    let book = await bookModel.findByIdAndDelete(req.params.id);
    res.send(book);
})

// Start the Express server and listen on the specified port
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}`);
});