let credentials;

main();

async function main() {
	/*
		This is the script that runs when the redirect uri page loads with the code that comes as the
		response of the first step of the OAuth transactions as a parameter in an url GET.

		(Probably in the future the redirect uri will be the same search page and this
		code will execute if the page is opened with the param code in its url)

		This code is used to continue the OAuth process using the "code" to finally get the access tokens that
		will allow to make request in the name of the user.
	*/

	// This gets and parses in an object the parameters (i.e. the part of the url after the '?' with key value pairs)
	// The object methods should be used to access the parameters by name. Unsplash seems to return only the "code"
	const urlParameters = new URLSearchParams(window.location.search);
	const code = urlParameters.get('code');
	document.getElementById('redirect-uri-data-container').innerHTML = code;

	credentials = await loadCredentials();
	//await requestOauthAccessToken(code);
	requestOauthAccessToken(code);




		//VALE HAY QUE HACER EL SERVIDOR WEB PARA PODER TENER ACCESO AL POST DATA AQUÍ, YA NO PUEDO SEGUIR POSTERGÁNDOLO







}


