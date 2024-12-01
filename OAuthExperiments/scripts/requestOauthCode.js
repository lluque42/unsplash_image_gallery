/*
	Source: https://unsplash.com/documentation/user-authentication-workflow

	This function performs the first step in the OAuth process.
	When called, a GET request is built for the Unsplash OAuth API.
	In the GET request this app identifies itself and asks for a code with some
	permissions (scope) associated and asks for the response to be sent to
	a redirect uri (one in this application) that will parse the code sent by the API.

	In the last line, the GET request to the API is actually performed by opening the
	constructed URL detailed above. This sends the user to an Unsplash page where
	it can login to Unsplash. Once the users login, Unsplash sends the user to my
	redirect uri where a script parses the code.
*/
let requestCodeUrl;
setupRequestOauthCode();

async function setupRequestOauthCode() {

	let credentials = await loadCredentials();

	const baseUrl = 'https://unsplash.com/oauth';
	const endpoint = `/authorize`;

	//const redirectUri = encodeURIComponent("http://localhost:5500/oauthRedirect.html");
	// IMPORTANT: Every redirect uri must be whitelisted in the Unsplash app configuration.
	const redirectUri = "http://localhost:5500/OAuthExperiments/oauthRedirect1ReceiveCode.html";
	//const redirectUri = encodeURIComponent("urn:ietf:wg:oauth:2.0:oob");
	/*
	From API doc:
		param			Description
		client_id		Your application’s access key.
		redirect_uri	A URI you control that handles successful user authorization.
		response_type	The access response type you are requesting. The authorization workflow Unsplash supports requires the value “code” here.
			(I think this is "code" to ask for the code that will be used in the next step with a post request to eventually get the user's
			access token that will be used from now on)
		scope			A +-separated list of requested scopes. e.g. public+read_user
			(check out https://unsplash.com/documentation/user-authentication-workflow#permission-scopes)
	*/
	const parameters = new URLSearchParams(
		{
			client_id: `${credentials.ACCESS_KEY}`,
			redirect_uri: redirectUri,
			response_type: "code",
			// Despite the api doc saying "A +-separated list of requested scopes. e.g. public+read_user", this doesn't work for me:
			//scope: "public+read_user+write_likes+read_collections",
			// It refers to the final render thanks to the URLSearchParams() which will transform these spaces into '+'
			scope: "public read_user write_likes read_collections",
		}
	).toString();

	// Notice the '?' for the GET
	const requestCodeUrl = `${baseUrl}${endpoint}?${parameters}`;

	const infoContainer = document.getElementById("info-container");
	infoContainer.innerText = `The url to go when clicking is: \n${requestCodeUrl}`;

	const askForCodeBtn = document.getElementById("ask-for-code-btn");
	askForCodeBtn.dataset.requestCodeUrl = requestCodeUrl;
}

function processRequestOauthCode() {
	/*
	If I manually open this url, the page from unsplash to authorize is opened,
	and when clicking accept, I'm correctly redirected to my redirect uri.
	BUT when trying to fetch() the url instead of copying and pasting it in a browser
	I get the cors error.

	Let's try just to open a page instead of using my fetchHttpRequest() function.

	This is enough here because it is a GET request and everything may go in the url.
	*/
	const askForCodeBtn = document.getElementById("ask-for-code-btn");

	window.open(askForCodeBtn.getAttribute('data-request-code-url'));
}