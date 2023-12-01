// Defining a functional component named Content
function Content() {
    return (
        <div>
            <h1>Hello World!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
}

// Exporting the Content component to make it available for use in other parts of the application
export default Content;
