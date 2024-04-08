let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => {
      slide.style.display = 'none';
    });
  
    if (index < 0) {
      slideIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      slideIndex = 0;
    } else {
      slideIndex = index;
    }
  
    slides[slideIndex].style.display = 'block';
  }
  
  function prevSlide() {
    showSlide(slideIndex - 1);
  }
  
  function nextSlide() {
    showSlide(slideIndex + 1);
  }
  
  showSlide(slideIndex);
  
