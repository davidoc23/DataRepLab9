import { useState } from "react";
import axios from "axios";

// Defining a functional component named Create
function Create() {
   const [title, setTitle] = useState(' ')
   const [author, setAuthor] = useState(' ')
   const [cover, setCover] = useState(' ')

   const handleSubmit = (e) => 
   {
    e.preventDefault();

    console.log("Title: " + title + " Author: " + author + " Cover: " + cover);

    //Book array
    const book = {
        title : title,
        cover : cover,
        author : author
    }

    axios.post('http://localhost:4000/api/books', book )
    .then()
    .catch();

   }

    return (
        <div>
            <h2>Hello from Create Component</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Book Title: </label>
                    <input type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Add Book Author: </label>
                    <input type="text"
                    className="form-control"
                    value={author}
                    onChange={(e) => { setAuthor(e.target.value) }}/>
                </div>
                <div className="form-group">
                    <label>Add Book Cover: </label>
                    <input type="text"
                    className="form-control"
                    value={cover}
                    onChange={(e) => { setCover(e.target.value) }}/>
                </div>
                <div>
                    <input type="submit" value="Add Book"></input>
                </div>
            </form>
        </div>
    );
}

// Exporting the Create component to make it available for use in other parts of the application
export default Create;
