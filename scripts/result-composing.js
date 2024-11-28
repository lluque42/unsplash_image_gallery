/*
function createImgResult() {
    return {
        "id": "123",
        "alt": "A cute cat",
        "height": 200,
        "width": 300,
        "url_thumbnail": "https://example.com/cat.jpg",
        "url_full": "https://example.com/cat.jpg",
        "url_small": "https://example.com/cat.jpg",
    };
}
*/

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


    // NOTICE THAT IN THIS CASE WE DONT USE ANONYMOUS FUNCTIONS
    favButton.addEventListener('click', function(event) {
        toggleFav(event);
    });

    imageThumbnail.addEventListener('click', function(event) {
        openImg(event);
    });
/*
    imageContainer.addEventListener('hover', function() {
        console.log('Hovered over image');
    })
*/
}

function toggleFav(event) {
    console.log('Added to favorites', event.target.parentElement.id);
}

function openImg(event) {
    console.log('Clicked on image', event.target.parentElement.id);
}

function hintOnImg(event) {
    console.log('Hovered over image',event.target.parentElement.id);
}