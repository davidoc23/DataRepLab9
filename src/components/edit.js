// Import necessary dependencies from React and React Router
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Functional component for editing a book
export default function Edit(props) {

    // The useParams hook returns an object of key/value pairs of
    // the dynamic params from the current URL that were matched by
    // the <Route path>.
    let { id } = useParams();

    // Use React's useState() hook to manage state for book details
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [author, setAuthor] = useState("");

    // useNavigate returns a function that we can use to navigate
    const navigate = useNavigate();

    // useEffect Hook is similar to componentDidMount
    useEffect(() => {
        // axios is a promise-based web client
        // make a HTTP Request with GET method and pass as part of the
        // url.
        axios.get('http://localhost:4000/api/book/' + id)
            .then((response) => {
                // Assign Response data to the state variables using useState.
                setTitle(response.data.title);
                setCover(response.data.cover);
                setAuthor(response.data.author);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]); // The dependency array ensures the effect runs when 'id' changes

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new book object with the updated details
        const newBook = {
            id: id,
            title: title,
            cover: cover,
            author: author
        };

        // Use axios to make a PUT request to update the book
        axios.put('http://localhost:4000/api/book/' + id, newBook)
            .then((res) => {
                console.log(res.data);
                // Navigate to the 'read' page after successful edit
                navigate('/read');
            });
    }

    // Show the form for editing the book details
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Book Title: </label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Add Release Year: </label>
                    <input type="text" className="form-control" value={cover} onChange={(e) => setCover(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Add Poster Url: </label>
                    <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Book" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}
