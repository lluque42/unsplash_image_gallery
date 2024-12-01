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