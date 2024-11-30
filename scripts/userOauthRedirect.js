/*
	This is the script that runs when the redirect uri page loads with the code that comes as the
	response of the first step of the OAuth transactions.

	This code is used then to continue the OAuth process to finally get the access tokens that
	will allow to make request in the name of the user.
*/

const urlParameters = new URLSearchParams(window.location.search);
const code = urlParameters.get('code');
document.getElementById('redirect-uri-data-container').innerHTML = code;

/*
// This gets and parses in an object the parameters (i.e. the part of the url after the '?' with key value pairs)
// The object methods should be used to access the parameters by name. Unsplash seems to return only the "code"
const urlParameters = new URLSearchParams(window.location.search);
console.log(typeof urlParameters);
const code = urlParameters.get('code');
document.getElementById('redirect-uri-data-container').innerHTML(`The code from unsplash is: ${code}`);
*/