document.addEventListener("DOMContentLoaded", () => {

    const cookieContainer = document.getElementById("cookieContainer");
    const acceptButton = document.getElementById("acceptCookies");
    const rejectButton = document.getElementById("rejectCookies");

    if (acceptButton) {
        acceptButton.addEventListener("click", () => {
            cookieContainer.classList.add("hidden");
        });
    }

    if (rejectButton) {
        rejectButton.addEventListener("click", () => {
            // Redirige siempre correctamente
            window.location.href = "https://www.google.com";
        });
    }

    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const closeMenu = document.getElementById("closeMenu");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.add("active");
            overlay.classList.add("active");
            menuToggle.classList.add("hidden");
        });
    }

    // Cerrar al hacer clic fuera
    if (overlay) {
        overlay.addEventListener("click", () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
            setTimeout(() => {
                menuToggle.classList.remove("hidden");
            }, 300);
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener("click", () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
            setTimeout(() => {
                menuToggle.classList.remove("hidden");
            }, 300);
        });
    }

    // Cerrar el menú al hacer clic en un enlace del sidebar
    const sidebarLinks = document.querySelectorAll(".sidebar a");

    sidebarLinks.forEach(link => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
            setTimeout(() => {
                menuToggle.classList.remove("hidden");
            }, 300);
        });
    });

});

const box = document.getElementById("dragBox");

let isDragging = false;
let offsetX;
let offsetY;

box.addEventListener("mousedown", (e) => {

    isDragging = true;

    offsetX = e.clientX - box.offsetLeft;
    offsetY = e.clientY - box.offsetTop;
});

document.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    box.style.left = (e.clientX - offsetX) + "px";
    box.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {

    isDragging = false;

});
