/*
httpRequestNamedFunctionsNoThenChainingButAwaitAsyncStyle
This version is the most explicit and the most familiar
(for someone like me who comes from C and C++), because it uses:
- Named functions instead of anonymous functions
- async/wait instead of .then chaining
- try/catch instead of .catch

There is probably another even more explicit way to do this using
callbacks/hooks/event listeners, but I'm not sure how to do that yet
of it is even possible in this context.
*/

// Process the returned promise using async/await
async function requestFirstImagesStyle3(url) {
    try {
        // This needs await because it returns a promise
        const response = await makeFetchRequest3(url); // Await the fetch promise
        // This needs await because the return of the function is the .json() of a promise
        const data = await handleResponse3(response); // Await the parsed JSON
        // No await is needed here, because the function doesn't return a promise
        handleData3(data); // Process the data
        return data; // Return the data
    } catch (error) {
        handleError3(error); // Handle errors
    }
}

// Function 1: Perform the fetch and return the promise
function makeFetchRequest3(url) {
    return fetch(url); // Return the promise
}

// Separate handler functions
function handleResponse3(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // This is a Promise, but it will be awaited in the caller
}

function handleData3(data) {
    return data; // Return the data
}

function handleError3(error) {
    console.error('Error occurred:', error.message);
}

