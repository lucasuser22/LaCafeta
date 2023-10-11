document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelector(".slides");
    const slideCount = document.querySelectorAll(".slides li").length;
    let currentIndex = 0;

    function updateSlide() {
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlide();
    }

    setInterval(nextSlide, 3000); 
    updateSlide(); 
});