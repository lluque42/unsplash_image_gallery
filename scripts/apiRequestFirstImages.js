/*
This version is the most short and unfamiliar for someone like me who
comes from C and C++), because it uses:
- Named functions instead of anonymous functions (using arrow functions syntax).
- .then chaining style which is another way to deal with asynchronicity in a
very disturbing way because its purpose is basically to help to forget that
we're actually dealing with asynchronous processes.
- The .catch() method is used to handle errors instead of try/catch.
*/

// Here there is no need for the async keyword because the function is not async
// because it does not return a promise (it returns the promise of fetch which is
// handled by the .then() chain thus the promise is necessarily resolved)
function apiRequestFirstImages(url) {
    //fetch('https://api.unsplash.com/photos/?client_id=dccWT6c-O9-cyli0Tcr-aBF7OWqeI2UzE-5RlsgVkRA')
    // The return here is necessary to allow chaining (i.e. .then())
    return fetch(url)
        // This .then() is used to process the response
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse JSON response
        })
        // This .then() is used to handle the parsed data
        .then(data => {
            //console.log('Data received [style 1]:', data);
            return data; // Return the data
        })
        // This .catch() is used to handle any errors that may occur while processing 
        .catch(error => {
            console.error('Error:', error);
            throw error; // Re-throw the error to be handled by the caller
        });
}


/*
This version is a little more explicit and more familiar
(for someone like me who comes from C and C++), because it uses:
- Named functions instead of anonymous functions.

It still uses the .then chaining style though.
*/

// Same as the previous example, with named functions
// instead of anonymous functions BUT with the chaining style
function apiRequestFirstImagesALTERNATIVESTYLE1(url) {

    return fetch(url)
        .then(handleResponse2) // Process the response
        .then(handleData2)     // Handle the parsed data
        .catch(handleError2);  // Handle any errors
// TODO PENDING what about the return statement?
// only available as the return of handleResponse() ???????
}

function handleResponse2(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse JSON from the response
}

function handleData2(data) {
    //console.log('Data received [style 2]:', data); // Log the parsed data
    return data; // Return the data
}

function handleError2(error) {
    console.error('Error occurred:', error); // Handle any errors
}


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
async function apiRequestFirstImagesALTERNATIVESTYLE2(url) {
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