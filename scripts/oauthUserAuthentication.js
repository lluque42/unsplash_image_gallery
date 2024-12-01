/*
	Source: https://unsplash.com/documentation/user-authentication-workflow

*/
async function requestOauthCode() {
	const baseUrl = 'https://unsplash.com/oauth';
	const endpoint = `/authorize`;

	//const redirectUri = encodeURIComponent("http://localhost:5500/oauthRedirect.html");
	// IMPORTANT: Every redirect uri must be whitelisted in the Unsplash app configuration.
	const redirectUri = "http://localhost:5500/oauthRedirect1ReceiveCode.html";
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
	const url = `${baseUrl}${endpoint}?${parameters}`;

	console.log(`The URL is: ${url}`);
	/*
	If I manually open this url, the page from unsplash to authorize is opened,
	and when clicking accept, I'm correctly redirected to my redirect uri.
	BUT when trying to fetch() the url instead of copying and pasting it in a browser
	I get the cors error.

	Let's try just to open a page instead of using my fetchHttpRequest() function.

	This is enough here because it is a GET request and everything may go in the url.
	*/
	window.open(url);
}

/*
Now this code is used to build the request of the access token.
According to the API documentation, once I have the code, this is the new request:

Make a POST request to https://unsplash.com/oauth/token with the following parameters:

	param			Description
	client_id		Your application’s access key.
	client_secret	Your application’s secret key.
	redirect_uri	Your application’s redirect URI.
	code			The authorization code supplied to the callback by Unsplash.
	grant_type		Value “authorization_code”.

If successful, the response body will be a JSON representation of your user’s access token:

	{
	"access_token": "091343ce13c8ae780065ecb3b13dc903475dd22cb78a05503c2e0c69c5e98044",
	"token_type": "bearer",
	"scope": "public read_photos write_photos",
	"created_at": 1436544465
	}

Access tokens do not expire.

On future requests, send OAuth Bearer access token via the HTTP Authorization header:

	Authorization: Bearer ACCESS_TOKEN
*/
async function requestOauthAccessToken(code) {
	const baseUrl = 'https://unsplash.com/oauth';
	const endpoint = `/token`;
	// IMPORTANT: Every redirect uri must be whitelisted in the Unsplash app configuration.
	const redirectUri = "http://localhost:5500/oauthRedirect2ReceiveAccessToken.html";

	const parameters = new URLSearchParams(
		{
			client_id: `${credentials.ACCESS_KEY}`,
			client_secret: `${credentials.SECRET_KEY}`,
			redirect_uri: redirectUri,
			code: code,
			grant_type: 'authorization_code',
		}
	).toString();

	// Notice the '?' for the GET
	//const url = `${baseUrl}${endpoint}?${parameters}`;

	const url = `${baseUrl}${endpoint}`;
	console.log(`The URL is: ${url}`);
	/*
	If I manually open this url, the page from unsplash to authorize is opened,
	and when clicking accept, I'm correctly redirected to my redirect uri.
	BUT when trying to fetch() the url instead of copying and pasting it in a browser
	I get the cors error.

	In contrast with the previous step, this must be a POST request so having only an url
	is not enough.
	*/
	//window.open(url);
	openUrlWithPost(url, parameters);
	
	//function openWindowWithPost(url, data)
}































	/*
	Interesting: With just trying to fetch the url using my fetchHttpRequest() instead of the above (window.open(url);), chrome shows this message:
	Access to fetch at 'https://unsplash.com/oauth/authorize?client_id={...}&redirect_uri=http%3A%2F%2Flocalhost%3A5500%2FoauthRedirect.html&response_type=code&scope=public+read_user+write_likes+read_collections'
	from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header contains the invalid value 'unsplash.com'.
	Have the server send the header with a valid value, or, if an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the
	resource with CORS disabled.

	So, I DO need a payload to be able to include a "mode" with "no-cors"
		fetchHttpRequest(url, {
			method: "GET",
			mode: "no-cors"
		});

	BUT doing so got me a catch error in fetchHttpRequest for !response.ok

	ALSO when no-cors the browser does NOT allow complete access to the data of the requests (obviously for security reasons)

	So I'll try to figure out how to "The 'Access-Control-Allow-Origin' header contains the invalid value 'unsplash.com'.
	Have the server send the header with a valid value"

	I'll try a suggestion from chatGPT which I don't know if it is standardized way and if Unsplash will comply.
	The suggestion is to include one or two headers in the original request that results in loading this redirection page:
		Host: api.example.com
		Origin: https://your-website.com
	And to enforce the mode: 'cors'

	There was more information to be considered:
		4. Debugging Tips
			Use browser developer tools to check the request and response headers.
			Ensure the Access-Control-Allow-Origin value matches the Origin header in the request.
			If the request method is not GET or HEAD, or if custom headers are sent, ensure the server handles preflight requests by responding to OPTIONS with appropriate CORS headers.
			Example Preflight Response:
				HTTP/1.1 204 No Content
				Access-Control-Allow-Origin: https://your-website.com
				Access-Control-Allow-Methods: GET, POST, OPTIONS
				Access-Control-Allow-Headers: Content-Type
			By asking the server to configure the proper Access-Control-Allow-Origin value,
			you can avoid using no-cors mode and access full response details.
	*/

/*
	const headers =
	{
		//"Access-Control-Allow-Origin": "http://localhost:5500/",
		"Origin": "unsplash.com",
		//"Host": ""

	};

	await fetchHttpRequest(url, {
		method: "GET",
		//mode: "cors",
		//headers: headers,
	});
*/
