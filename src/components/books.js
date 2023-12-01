// Importing the BookItem component from the 'bookItem' file
import BookItem from "./bookItem";

// Defining a functional component named Books that takes 'props' as a parameter
function Books(props) {
    // Using the map function to iterate through an array of books (props.myBooks)
    return props.myBooks.map(
        (book) => {
            // Rendering the BookItem component for each book in the array
            // Passing book data as 'myBook' prop and using 'isbn' as a unique key
            return <BookItem myBook={book} key={book._id} Reload={()=>(props.ReloadData())}></BookItem>
        }
    );
}

// Exporting the Books component to make it available for use in other parts of the application
export default Books;
