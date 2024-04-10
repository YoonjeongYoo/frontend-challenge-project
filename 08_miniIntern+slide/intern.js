let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let timer; // 변수 추가: 자동 슬라이드를 위한 타이머

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
  
  function startSlide() {
    timer = setInterval(() => {
      nextSlide();
    }, 2000); // 2초 간격으로 자동 슬라이드 설정
  }
  
  function stopSlide() {
    clearInterval(timer); // 자동 슬라이드를 멈추는 함수
  }
  
  showSlide(slideIndex);
  startSlide(); // 페이지가 로드될 때 자동 슬라이드 시작
