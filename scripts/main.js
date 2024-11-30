main();

let credentials;
const numberOfImages = 5;

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
	//console.log(credentials);
	//console.log(await credentials.ACCESS_KEY);



	/*
	This await is still necessary to wait for the response from the function
	even though the function uses the .then style instead of async/await
	(This happens because the function somehow deals with promises which
	introduces an asynchronous element to the mix)
    
	The object credentials can be used here because of the await when
	calling loadCredentials() that assures that at this point its
	content is valid and not a promise.
	*/
	let apiResponseJson = await apiRequestFirstImages(credentials, numberOfImages);

	//apiResponseJson = await apiRequestFirstImagesALTERNATIVESTYLE1(credentials, numberOfImages);
	//console.log(`The apiRequestFirstImagesALTERNATIVESTYLE1 output:`, JSON.parse(JSON.stringify(apiResponseJson)));
	//apiResponseJson = await apiRequestFirstImagesALTERNATIVESTYLE2(credentials, numberOfImages);
	//console.log(`The apiRequestFirstImagesALTERNATIVESTYLE2 output:`, JSON.parse(JSON.stringify(apiResponseJson)));

	showImagesFromApi(apiResponseJson);




}

