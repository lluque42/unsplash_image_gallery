main();

// This function is async in order to use the await keyword
// when calling other async functions
async function main() {
    init_base_listeners();
    let endpoint = 'https://api.unsplash.com/photos/?client_id=dccWT6c-O9-cyli0Tcr-aBF7OWqeI2UzE-5RlsgVkRA';
    let apiResponseJson;
    apiResponseJson = await requestFirstImagesStyle1(endpoint);
    console.log(`The style 1 output:`, JSON.parse(JSON.stringify(apiResponseJson)));
    apiResponseJson = await requestFirstImagesStyle2(endpoint);
    console.log(`The style 2 output:`, JSON.parse(JSON.stringify(apiResponseJson)));
    apiResponseJson = await requestFirstImagesStyle3(endpoint);
    console.log(`The style 3 output:`, JSON.parse(JSON.stringify(apiResponseJson)));
}