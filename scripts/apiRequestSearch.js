async function apiRequestSearch(credentials, searchString, numberOfImages) {
	/*
	First, the construction of the url.
	Since this request is performed with GET, the parameters go into
	the url, not in the body of the request.
	*/
	const baseUrl = 'https://api.unsplash.com';
	const endpoint = `/search/photos/`;

	// The following are the parameters according to the API documentation
	const per_page = numberOfImages;
	const query = searchString;

	/*
	The URLSearchParams() comes from the Web API, specifically the URL API
	It allows to work with a json formatted variable (which is cool for
	manipulation and legibility) and also "It simplifies the process of
	encoding and appending key-value pairs to a URL in a format that is
	properly escaped and adheres to the rules of URL syntax."
	For example:
		const params = new URLSearchParams({ page: 2, search: "my apple" });
		console.log(params.toString());
	Will output: "page=2&search=my+apple" (notice how it turns a space into a '+')

	The .toString part is because the return object needs to be serialized
	to construct the url (remember this request is with GET and (most) of the
	request data goes inside the url).
	*/
	const parameters = new URLSearchParams(
		{
			per_page: `${numberOfImages}`,
			query: `${searchString}`,
		//	client_id: `${credentials.ACCESS_KEY}`,		// This can't go in here even though it's a GET request
														// It goes in the header
		}
	).toString();

	// Notice the '?' for the GET
	const url = `${baseUrl}${endpoint}?${parameters}`;

	console.log(`The URL is: ${url}`);

	/*
	Now the construction of the payload
	*/
	const method = 'GET';

	// Check out the Unsplash API documentation for the content/syntax
	// of the authorization header:
	//		https://unsplash.com/documentation#authorization
	const headers =
	{
		"Content-Type": "application/json",
		"Authorization": `Client-ID ${credentials.ACCESS_KEY}`,
	};
	console.log(headers);
	//const body;										// Irrelevant in this case: GET does not accept a body

	/*
	Finally the fetching of the url, just like in apiRequestFirstImages()
	BUT with a payload
	*/
	return fetch(url, {
		method: method,
		headers: headers,
		//body: JSON.stringify(body),				// Irrelevant in this case: GET does not accept a body
	})
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


/*
	const query = `?client_id=${credentials.ACCESS_KEY}`;
	const url = `${baseUrl}${endpoint}${query}`;
	console.log(`The URL is: ${url}`);
	let apiResponseJson;
*/
}

/*
	According to the API documentation, this is the format of the expected response to this request:
	{
  "total": 133,
  "total_pages": 7,
  "results": [
    {
      "id": "eOLpJytrbsQ",
      "created_at": "2014-11-18T14:35:36-05:00",
      "width": 4000,
      "height": 3000,
      "color": "#A7A2A1",
      "blur_hash": "LaLXMa9Fx[D%~q%MtQM|kDRjtRIU",
      "likes": 286,
      "liked_by_user": false,
      "description": "A man drinking a coffee.",
      "user": {
        "id": "Ul0QVz12Goo",
        "username": "ugmonk",
        "name": "Jeff Sheldon",
        "first_name": "Jeff",
        "last_name": "Sheldon",
        "instagram_username": "instantgrammer",
        "twitter_username": "ugmonk",
        "portfolio_url": "http://ugmonk.com/",
        "profile_image": {
          "small": "https://images.unsplash.com/profile-1441298803695-accd94000cac?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=7cfe3b93750cb0c93e2f7caec08b5a41",
          "medium": "https://images.unsplash.com/profile-1441298803695-accd94000cac?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64&s=5a9dc749c43ce5bd60870b129a40902f",
          "large": "https://images.unsplash.com/profile-1441298803695-accd94000cac?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=32085a077889586df88bfbe406692202"
        },
        "links": {
          "self": "https://api.unsplash.com/users/ugmonk",
          "html": "http://unsplash.com/@ugmonk",
          "photos": "https://api.unsplash.com/users/ugmonk/photos",
          "likes": "https://api.unsplash.com/users/ugmonk/likes"
        }
      },
      "current_user_collections": [],
      "urls": {
        "raw": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f",
        "full": "https://hd.unsplash.com/photo-1416339306562-f3d12fefd36f",
        "regular": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=92f3e02f63678acc8416d044e189f515",
        "small": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=263af33585f9d32af39d165b000845eb",
        "thumb": "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=8aae34cf35df31a592f0bef16e6342ef"
      },
      "links": {
        "self": "https://api.unsplash.com/photos/eOLpJytrbsQ",
        "html": "http://unsplash.com/photos/eOLpJytrbsQ",
        "download": "http://unsplash.com/photos/eOLpJytrbsQ/download"
      }
    },
    // more photos ...
  ]
}
*/