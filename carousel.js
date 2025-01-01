document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".carousel-item");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentIndex = 0;

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove("active", "left", "right");
            if (index === currentIndex) {
                item.classList.add("active");
            } else if (index === (currentIndex - 1 + items.length) % items.length) {
                item.classList.add("left");
            } else if (index === (currentIndex + 1) % items.length) {
                item.classList.add("right");
            }
        });
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    });

    // Initialize carousel
    updateCarousel();
});
