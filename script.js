const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Unsplash Api
const count = 10;
const apiKey = 'Gaj-qR9u1FukDSPt0HrDrTiIcU3wYaLCU_Cfg70fGT0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all the images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imageLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}
// Helper function to Set attributes on DOM element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create element for links and photos add it to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    // Run function for each object in photo array
    photoArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.description,
        })
        // Add eventlistner for when all the images are comletely loaded
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a> then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    } );
}

// Get photos from unsplash API
async function getPhotos() {
    try {
        const Response = await fetch (apiUrl);
        photoArray = await Response.json();
        displayPhotos();
    } catch (error) {
        // Catch error
    }
}

// Load more pictures when scrolling is about to end
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();

    }
});
getPhotos();