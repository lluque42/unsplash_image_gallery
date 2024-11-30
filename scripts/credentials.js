function loadCredentials() {
	// Had troubles with env.json as a hidden file, may be because
	// fetch() actually searches 127.0.0.1:5501/env.json and I can
	// only think this always goes through a pseudo web server
	// that blocks hidden files for security reasons
	return fetch('env.json')
		.then(response => {
			if (!response.ok) {
				throw new Error(`Error opening .env! Status: ${response.status}`);
			}
			return response.json();     // Only after this line the data is actually available
			// Check out https://developer.mozilla.org/en-US/docs/Web/API/Request/json
		})
		.then(data => {
			return data;
			//console.log(data);
			//console.log(credentials.ACCESS_KEY);
		})
		.catch(error => {
			console.error('Error:', error);
		});

}