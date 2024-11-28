/*
httpRequestNamedFunctionsChainingStyle
*/

// Same as the previous example, with named functions
// instead of anonymous functions BUT with the chaining style

function requestFirstImagesStyle2(url) {

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


