// Unsplash API
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

const count = 10;
const apiKey = "c_HNVEGfgMEp0tn9YF5-BlQIxlNYNmCSlYQHOUeiuog";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  console.log("image loaded");
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create elements for links
function displayPhotos() {
  // Run functin for each object in array
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank"); turns to below for DRY code
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create img for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description); turns to below
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener check when each is finished loading
    img.addEventListener("load", imageLoaded);
    //img inside <a>, then put both inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //catch error
  }
}

//Check to see if scrolling near bottom
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
    console.log("load");
  }
});

// On Load
getPhotos();
