const imagesArea = document.querySelector(".images");
const gallery = document.querySelector(".gallery");
const galleryHeader = document.querySelector(".gallery-header");
const searchBtn = document.getElementById("search-btn");
const sliderBtn = document.getElementById("create-slider");
const sliderContainer = document.getElementById("sliders");
// selected image
let sliders = [];

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = "LPwGv1sBpwdShKQKhg1S2eyg7Qmo1iYfrrCAUOVd7RU";

// show images
const showImages = (images) => {
  imagesArea.style.display = "block";
  gallery.innerHTML = "";
  // show gallery title
  galleryHeader.style.display = "flex";
  images.forEach((image) => {
    let div = document.createElement("div");
    div.className = "col-lg-3 col-md-4 col-xs-6 img-item mb-2";
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.urls.regular}") src="${image.urls.regular}" alt="${image.alt_description}">`;
    gallery.appendChild(div);
  });
  toggleSpinner();
};

const getImages = (query) => {
  toggleSpinner();
  fetch(
    `https://api.unsplash.com/search/photos/?client_id=${KEY}&query=${query}`
  )
    .then((response) => response.json())
    .then((data) => showImages(data.results))
    .catch((err) => console.log(err));
};

// let slideIndex = 0;

const toggleSpinner = () => {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.toggle("d-none");
  gallery.classList.toggle("d-none");
};

var timer;

// change slider index
const changeItem = (index) => {
  changeSlide((slideIndex += index));
};

searchBtn.addEventListener("click", function () {
  document.querySelector(".main").style.display = "none";
  clearInterval(timer);
  const search = document.getElementById("search");
  getImages(search.value);
  sliders.length = 0;
});

document
  .getElementById("search")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });
