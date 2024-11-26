function addResult(url) {
    const resultsContainer = document.getElementById('results-container')
    const imageContainer = document.createElement('div');
    const imageThumbnail = document.createElement('img');
    const favButton = document.createElement('button');

    imageContainer.classList.add('image-container');
    imageThumbnail.classList.add('image-thumbnail');
    favButton.classList.add('fav-button-add');

    imageContainer.appendChild(imageThumbnail);
    imageContainer.appendChild(document.createElement('br'));
    imageContainer.appendChild(favButton);
    resultsContainer.appendChild(imageContainer);

    favButton.innerHTML = 'Add to favorites';
    
 
    imageThumbnail.src = url;
}