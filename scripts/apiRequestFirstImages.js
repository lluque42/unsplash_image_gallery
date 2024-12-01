async function apiRequestFirstImages(credentials, numberOfImages) {
	const baseUrl = 'https://api.unsplash.com';
	const endpoint = `/photos/`;
	const query = `?client_id=${credentials.ACCESS_KEY}`;
	const url = `${baseUrl}${endpoint}${query}`;
	console.log(`The URL is: ${url}`);
	let apiResponseJson;

	return await fetchHttpRequest(url, null);
}