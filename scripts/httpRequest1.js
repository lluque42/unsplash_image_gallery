/*
httpRequestAnonymousFunctionsChainingStyle
*/

//A very unfamiliar way of writing the request and response handling
//using anonymous functions and chaining

// Here there is no need for the async keyword because the function is not async
// because it does not return a promise (it returns the promise of fetch which is
// handled by the .then() chain thus the promise is necessarily resolved)
function requestFirstImagesStyle1(url) {
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
   

// TODO PENDING what about the return statement?
// only available as the return of handleResponse() ???????
}