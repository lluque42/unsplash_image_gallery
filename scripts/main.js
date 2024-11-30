main();

let credentials;
// This function is async in order to use the await keyword
// when calling other async functions
async function main() {
    init_base_listeners();
    const unsplashApiBaseUrl = 'https://api.unsplash.com';
    let endpoint = `/photos/`;
    credentials = await loadCredentials();
    //console.log(credentials);
    //console.log(await credentials.ACCESS_KEY);
    let query = `?client_id=${await credentials.ACCESS_KEY}`;
    let url = `${unsplashApiBaseUrl}${endpoint}${query}`;
    console.log(`The URL is: ${url}`);
    let apiResponseJson;
    // This await is necessary to wait for the response from the function
    // This function returns a promise (or something that depends on a promise)
    apiResponseJson = await apiRequestFirstImages(url);
    console.log(`The style 1 output:`, JSON.parse(JSON.stringify(apiResponseJson)));
    // This await is necessary to wait for the response from the function
    // This function returns a promise (or something that depends on a promise)
    //apiResponseJson = await requestFirstImagesStyle2(endpoint);
    //console.log(`The style 2 output:`, JSON.parse(JSON.stringify(apiResponseJson)));
    // This await is necessary to wait for the response from the function
    // This function returns a promise (or something that depends on a promise)
    //apiResponseJson = await requestFirstImagesStyle3(endpoint);
    //console.log(`The style 3 output:`, JSON.parse(JSON.stringify(apiResponseJson)));

    
    apiResponseJson.forEach(element => {
        console.log(element.id);
        let imgResult = parseApiResult(element);
        addResult(imgResult);
    });
    

    
}

