let credentials;
const numberOfImages = 5;

main();

/*
This function is async in order to be able to use the await keyword
when calling other functions that are asynchronous in nature.
*/
async function main() {

	initBaseListeners();

	/*
	This needs an await because the function somehow deals with promises which
	introduces an asynchronous element to the mix. The file with the credentials
	is also read with fetch()
	*/
	credentials = await loadCredentials();

	/*
	This await is still necessary to wait for the response from the function
	even though the function uses the .then style instead of async/await
	(This happens because the function somehow deals with promises which
	introduces an asynchronous element to the mix)
    
	The object credentials can be used here because of the await when
	calling loadCredentials() that assures that at this point its
	content is valid and not a promise.
	*/
	//let apiResponseJson = await apiRequestFirstImages(credentials, numberOfImages);
	//showImagesFromApi(apiResponseJson);
	// UNCOMMENT THE TWO LINES ABOVE FOR SHOWING TEN RANDOM RESULTS EVERYTIME THE
	// PAGE LOADS (THIS BURNS REQUESTS FOR DE DEMO VERSION, NOT WORTHY)
}

