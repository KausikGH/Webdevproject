document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const closeBtn = document.querySelector(".lightbox .close");

    galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = item.src;
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });
});