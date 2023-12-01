// Importing the 'Books' component from the "books" file
import Books from "./books";
import { useEffect, useState } from "react";
import axios from "axios";


// Defining a functional component named Read
function Read() {
    // Data representing a list of books
    const [data, setData] = useState([]);

    useEffect(
        
        ()=>{
            //using our own server ot retrieve the data
            axios.get('http://localhost:4000/api/books')
            .then(
                (response)=>{
                    setData(response.data)
                }
            )
            .catch(
                (error)=>{
                    console.log(error);
                }
            )
        },[]
    );

    //reload the site 
    const Reload = (e)=>{
        axios.get('http://localhost:4000/api/books')
            .then(
                (response)=>{
                    setData(response.data)
                }
            )
            .catch(
                (error)=>{
                    console.log(error);
                }
            )
    }

    return (
        <div>
            <h2>Hello from Read Component</h2>
            {/* Rendering the 'Books' component and passing the book data as 'myBooks' prop */}
            <Books myBooks={data} ReloadData = {Reload} ></Books>
        </div>
    );
}

// Exporting the Read component to make it available for use in other parts of the application
export default Read;
