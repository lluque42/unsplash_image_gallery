/*
This is a generic version to process every fetch request for http.
It must receive the full url and optionally (there might be no need for a GET with its data inside the url)
a payload javascript object in the format:
	{
		method: methodString,						// "GET", "POST",...
		headers: headersObj,						// Usually another javascript object that does not need
													// to be serialized because the headers are standardized.
													// This data is well-known meta data defined in the http standard.
		body: dataString,							// Only for http methods that accept a body
													// If this is a json object, it must be serialized.
													// This is due to the diversity and non-standardized nature
													// of the actual data passed to an API: an image, a json string
													// (the Unsplash API case), an XML string, etc.
	}
	Details:
		methodString is a constant string with the name of the http verb.
		headersObj is a javascript object with a standardized structure for http metadata like:
			const headersObj =
			{
				"Content-Type": "application/json",
				"Authorization": `Client-ID ${credentials.ACCESS_KEY}`,	
			};
		dataObj that MUST be passed serialized as dataString is a javascript object like:
			const dataObj =
			{
				"Content-Type": "application/json",
				"Authorization": `Client-ID ${credentials.ACCESS_KEY}`,	
			};
		Which MUST be serialized somehow: if the api accepts json then dataString = JSON.stringify(dataObj);
*/

/*
/*
This style is the most short and unfamiliar for someone like me who
comes from C and C++), because it uses:
- Named functions instead of anonymous functions (using arrow functions syntax).
- .then chaining style which is another way to deal with asynchronicity in a
very disturbing way because its purpose is basically to help to forget that
we're actually dealing with asynchronous processes.
- The .catch() method is used to handle errors instead of try/catch.
*/
async function fetchHttpRequest(urlString, payloadObj)
{
	if (payloadObj !== null) {
		return fetch(urlString, payloadObj)
		// This .then() is used to process the promise returned by fetch and
		// parse it to JSON. Keep in mind that this particular API receives info in
		// json format and responds also in json format.
		// The argument "response" represent said promise at this point
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json(); // Parse JSON response
		})
		// This .then() is used to handle the JSON parsed data ONCE the promise is resolved.
		// The argument data represents the resolved promise data from above in json format.
		// Keep in mind that this particular API receives info in
		// json format and responds also in json format.
		.then(data => {
			//console.log('Data received [style 1]:', data);
			return data; // Return the data
		})
		// This .catch() is used to handle any errors that may occur while processing 
		.catch(error => {
			console.error('Error:', error);
			throw error;			// Re-throw the error to be handled by the caller
		});
	}
	else {
		return fetch(urlString)
		// This .then() is used to process the promise returned by fetch and
		// parse it to JSON. Keep in mind that this particular API receives info in
		// json format and responds also in json format.
		// The argument "response" represent said promise at this point
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json(); // Parse JSON response
		})
		// This .then() is used to handle the JSON parsed data ONCE the promise is resolved.
		// The argument data represents the resolved promise data from above in json format.
		// Keep in mind that this particular API receives info in
		// json format and responds also in json format.
		.then(data => {
			//console.log('Data received [style 1]:', data);
			return data; // Return the data
		})
		// This .catch() is used to handle any errors that may occur while processing 
		.catch(error => {
			console.error('Error:', error);
			throw error;			// Re-throw the error to be handled by the caller
		});
	}
	

}



/////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Alternative styles. Not used, left here just for pedagogic reasons.
/////////////////////////////////////////////////////////////////////////////////////////////////////////

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