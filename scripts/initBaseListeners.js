async function initBaseListeners() {
	document.addEventListener('DOMContentLoaded', function () {
		/*
		Notice the async in the second parameter of addEventListener(). It's required for
		the await of the apiRequestSearch() call since it deals internally with promises.
		*/
		document.getElementById('login-button').addEventListener('click', async function () {
			//await requestOauthCode();
			//await entryPointUserAuthentication(credentials);
			//window.open("OAuthExperiments/oauthRedirect0.html","_self");
			window.open("OAuthExperiments/oauthRedirect0.html");
		});
		/*
		Notice the async in the second parameter of addEventListener(). It's required for
		the await of the apiRequestSearch() call since it deals internally with promises.
		*/
		document.getElementById('search-button').addEventListener('click', async function () {
			let searchString = document.getElementById('search-input').value;
			console.log(searchString);
			if (searchString === "")
				return;
			let apiResponseJson = await apiRequestSearch(credentials, searchString, numberOfImages);
			console.log(JSON.parse(JSON.stringify(apiResponseJson)));
			// Notice that in the case of a search, the array of the images data is inside
			// a result member.
			showImagesFromApi(apiResponseJson.results);
		});
		document.getElementById('search-input').addEventListener("keypress", function(event) {
			// If the user presses the "Enter" key on the keyboard
			if (event.key === "Enter") {
			  // Cancel the default action, if needed (?)
			  event.preventDefault();
			  // Trigger the button element with a click
			  document.getElementById("search-button").click();
			}
		  });
	});
}