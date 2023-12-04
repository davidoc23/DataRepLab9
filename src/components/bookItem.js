// Importing necessary components from react-bootstrap
import { CardBody, CardHeader } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button  from 'react-bootstrap/Button';
import axios from 'axios';

// Defining a functional component named BookItem with props as the parameter
function BookItem(props) {
    return (
        <div>
            {/* Card component from react-bootstrap */}
            <Card>
                {/* Displaying the book's title in the Card Header */}
                <CardHeader>{props.myBook.cover}</CardHeader>

                <CardBody>
                    <blockquote className='blockquote mb-0'>
                        {/* Displaying the book's thumbnail image */}
                        <img src={props.myBook.cover}></img>

                        <footer>
                            {/* Displaying the first author of the book */}
                            {props.myBook.author}
                        </footer>
                    </blockquote>
                </CardBody>

                {/* - Link to Edit Page:
                    - The Link component is used to create a navigation link to the "edit" page for a specific book.
                    - The `to` prop specifies the destination URL, which includes the book ID appended to "/edit/".
                    - The `className` prop sets the CSS classes for styling the link as a button with a primary color. */}
                <Link to={"/edit/" + props.myBook._id} className='btn btn-primary'>Edit</Link>
                <Button
                    variant='danger'  // Set the button style to a red/danger variant
                    onClick={(e) => {  // Define the click event handler
                        e.preventDefault();  // Prevent the default behavior of the button click (useful in forms)

                        // Make a DELETE request to the specified API endpoint using axios
                        axios.delete('http://localhost:4000/api/book/' + props.myBook._id)
                            .then((res) => {
                                // If the DELETE request is successful, trigger the Reload function passed as a prop
                                let reload = props.Reload();
                            })
                            .catch((error) => {
                                // Handle any errors that occur during the DELETE request
                                console.error('Error deleting book:', error);
                            });
                    }}
                >
                    {/* Add any content or text you want to display within the button */}
                    Delete Book
                </Button>

            </Card>
        </div>
    );
}

// Exporting the BookItem component to make it available for use in other parts of the application
export default BookItem;
