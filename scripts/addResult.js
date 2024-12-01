function addResult(imgResult) {
    const resultsContainer = document.getElementById('results-container')
    const imageContainer = document.createElement('div');
    const imageThumbnail = document.createElement('img');
    const favButton = document.createElement('button');
    const tooltipText = document.createElement('span');

    imageContainer.classList.add('image-container');
    imageContainer.classList.add('tooltip');    // To be toopltipeable
    imageThumbnail.classList.add('image-thumbnail');
    favButton.classList.add('fav-button-add');
    tooltipText.classList.add('tooltip-text');  // The hidden tooltip text that will be displayed on hover

    imageContainer.appendChild(tooltipText);
    imageContainer.appendChild(imageThumbnail);
    imageContainer.appendChild(document.createElement('br'));
    imageContainer.appendChild(favButton);
    resultsContainer.appendChild(imageContainer);
    

    favButton.innerHTML = 'Add to favorites';
    tooltipText.innerHTML = `Size (hxw): ${imgResult.height} x ${imgResult.width}\n Description: ${imgResult.alt}`;  //
 
    imageThumbnail.src = imgResult.url_thumbnail;
    imageContainer.id = imgResult.id;
    imageThumbnail.alt = imgResult.alt;

	/*
		Here a new challenge is identified:
			There is some data in imgResult (the data parsed for this image from the API response)
			that is not included in the html element but that it's needed by the functions that
			handle the events (which, by default, only receive the event argument).
			For the data that IS included, those functions can access it through the retrieval of
			the html element using event.target.parentElement or event.currentTarget and from there
			getting things like the .id, etc.
		
		Some generic approachs to solve this issue are:
			* Reference in the handler a global variable. This might help but the global variable
			not necessarily stores specific data to the element that produces the event nor it can
			have the expected state when the event occurs.
			* Add to the html element the needed specific data so it can be retrieved from the
			function handler with event.target.parentElement or event.currentTarget:
				This approach is ok BUT: (1) It depends on extra load for the DOM (adding more things
				that it should have); (2) Since the data must reside in the DOM, it has to be serialized
				thus losing the structure that it may have as, for example, an object; (3) Sensitive
				data might be exposed.
				There are apparently two alternatives for this approach:
					* Ad-hoc custom property for the html element:
						imageThumbnail.urlToFull = imgResult.url_full;
						imageThumbnail.urlToSmall = imgResult.url_small;
						NOTE: I think this relies on the javascript chilling chaos of allowing to add members
						to an object in run-time. I feel dirty.
						This properties are accessed in the function handler as something like:
							event.currentTarget.urlToFull
					* Using the dataset API (built into the DOM API) which apparently does the same as the
					above but in a standardized manner creating data-* named properties when something is added
					to the dataset:
						imageThumbnail.dataset.urlToFull = imgResult.url_full;
						imageThumbnail.dataset.urlToSmall = imgResult.url_full;
						This properties accessed in the function handler as something like:
							event.currentTarget.dataset.urlToFull
						NOTE: This seems a more explicit and clean way to implement this approach than the
						ad-hoc properties adding using the (disgusting) flexibility of javascript.
			* Use bindings which apparently allows to bind extra arguments to the handler function which will
			receive it as the first argument, and the event object will automatically follow as the second argument
			when the event occurs. It is implemented with something like this:
				Instead of:
					imageThumbnail.addEventListener('click', function(event) {
						openImg(event);
					});

					And then:
						function openImg(event) {
							console.log('Clicked on image', event.target.parentElement.id);
						}
				Something like:
					imageThumbnail.addEventListener('click', openImg.bind(null, imageThumbnail.urlToFull);
					});

					And then:
						function openImg(urlToFull, event) {
							console.log('Clicked on image', event.target.parentElement.id);
							console.log(`Now I can access ${urlToFull}`);
						}
				NOTE: This is cool, seems like the most proper way. I think what it actually do (in C terms) is
				to overload/modify the prototype of the function expected by addEventListener(), which is still
				crazy but cool.
	*/

	imageThumbnail.dataset.urlToFull = imgResult.url_full;
	imageThumbnail.dataset.urlToSmall = imgResult.url_full;

    // NOTICE THAT IN THIS CASE WE DONT USE ANONYMOUS FUNCTIONS, but we might, using arrow functions
    favButton.addEventListener('click', function(event) {
        toggleFav(event);
    });

    imageThumbnail.addEventListener('click', function(event) {
        openImg(event);
    });
	
}

function toggleFav(event) {
    console.log('Added to favorites', event.target.parentElement.id);
	alert("Login first!")
}

function openImg(event, imgResult) {
    console.log('Clicked on image', event.target.parentElement.id);
	console.log('The url to full image version', event.currentTarget.dataset.urlToFull);
	window.open(event.currentTarget.dataset.urlToFull);
}