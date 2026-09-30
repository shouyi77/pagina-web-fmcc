document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       POP-UP DE COOKIES
    ================================= */
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

    /* ================================
       MENÚ LATERAL (SIDEBAR)
    ================================= */
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.add("active");
            overlay.classList.add("active");
        });
    }

    // Cerrar al hacer clic fuera
    if (overlay) {
        overlay.addEventListener("click", () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        });
    }

    // Cerrar el menú al hacer clic en un enlace del sidebar
    const sidebarLinks = document.querySelectorAll(".sidebar a");

    sidebarLinks.forEach(link => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        });
    });

});
