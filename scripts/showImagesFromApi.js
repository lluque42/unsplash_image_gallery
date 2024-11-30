function showImagesFromApi(arrayApiResponseForImages) {
	arrayApiResponseForImages.forEach(imageApiData => {
		console.log(imageApiData.id);
		let imgResult = parseApiResult(imageApiData);
		addResult(imgResult);
	});
}