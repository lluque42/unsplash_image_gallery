function parseApiResult(apiResult) {
    return {
        id: apiResult.id,
        alt: apiResult.alt_description,
        height: apiResult.height,
        width: apiResult.width,
        url_thumbnail: apiResult.urls.thumb,
        url_full: apiResult.urls.full,
        url_small: apiResult.urls.small,
    };
}

function showImagesFromApi(arrayApiResponseForImages) {
	const resultsContainer = document.getElementById('results-container');
	// This also removes every event listener, freeing resources
	while (resultsContainer.firstChild) {
		resultsContainer.removeChild(resultsContainer.firstChild);
	}
	arrayApiResponseForImages.forEach(imageApiData => {
		console.log(imageApiData.id);
		let imgResult = parseApiResult(imageApiData);
		addResult(imgResult);
	});
}