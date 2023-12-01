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
                <Button variant='danger' onClick={
                    (e)=>{
                        e.preventDefault();

                        axios.delete('http://localhost:4000/api/book/' +props.myBook._id)
                        .then((res)=>{
                            let reload = props.Reload();
                        })
                        .catch();
                    }
                }>
                    Delete
                </Button>
            </Card>
        </div>
    );
}

// Exporting the BookItem component to make it available for use in other parts of the application
export default BookItem;
