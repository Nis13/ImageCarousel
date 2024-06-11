const carouselContainer = document.getElementsByClassName('carousel-container');
const carouselWrapper = document.getElementsByClassName('carousel-image-wrapper')[0];
const images = document.getElementsByTagName('img');
const imageArray = Array.from(images);
const intervalTime = 4000;
const imageCount = imageArray.length;

function slideshow() {
  let currentIndex = 0;
  let direction = 1; //to control the direction of flow
  let intervalId:number;

  function setInitialPositions() {
    imageArray.forEach((image, index) => {
      image.style.left = `${index * 100}%`;
    });
  }

  function transitionToNextImage() {
    currentIndex += direction;
    
    if (currentIndex >= imageCount || currentIndex < 0){
        currentIndex = 0;
    }

    imageArray.forEach((image, index) => {
      const newPosition = (index - currentIndex) * 100;
      image.style.left = `${newPosition}%`;
    });
    updateDots();
  }

  function startSlideshow() {
    intervalId = setInterval(transitionToNextImage, intervalTime);
  }

  function stopSlideshow() {
    clearInterval(intervalId);
  }

  function addButtons() {
    const buttonLeft = document.createElement('button');
    const buttonRight = document.createElement('button');

    //for left button
    buttonLeft.className = 'slideshow-btn slideshow-btn__left';
    buttonLeft.innerHTML = '&#10094;';
    buttonLeft.addEventListener('click', () => {
      stopSlideshow();
      direction = -1; //-1 indicates the opposite flow i.e to left
      transitionToNextImage();
      startSlideshow(); 
    });

    //for right button
    buttonRight.className = 'slideshow-btn slideshow-btn__right';
    buttonRight.innerHTML = '&#10095;'; 
    buttonRight.addEventListener('click', () => {
      stopSlideshow(); 
      direction = 1; 
      transitionToNextImage();
      startSlideshow(); 
    });

    carouselWrapper.appendChild(buttonLeft);
    carouselWrapper.appendChild(buttonRight);
  }



  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'dots-container';

  const dots: HTMLSpanElement[] = [];
  function createDot(){
  for (let i = 0; i < imageCount; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.addEventListener('click', () => {
      stopSlideshow(); 
      currentIndex = i;
      updateDots();
      imageArray.forEach((image, index) => {
        const newPosition = (index - currentIndex) * 100;
        image.style.left = `${newPosition}%`;
      });
      startSlideshow(); 
    });
    dots.push(dot);
    dotsContainer.appendChild(dot);
  }
  carouselWrapper.appendChild(dotsContainer);
  dots[currentIndex].classList.add('active');}

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.remove('active');
      if (index === currentIndex) {
        dot.classList.add('active');
      }
    });
  }
  setInitialPositions();
  startSlideshow();
  addButtons();
  createDot();
}

slideshow();
