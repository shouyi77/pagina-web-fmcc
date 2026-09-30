document.addEventListener('DOMContentLoaded', function() {
            
            const cookieContainer = document.getElementById('cookieContainer');
            const acceptButton = document.getElementById('acceptCookies');
            const rejectButton = document.getElementById('rejectCookies');

            // 1. Evento para ACEPTAR
            acceptButton.addEventListener('click', function() {
                cookieContainer.classList.add('hidden');
            });

            // 2. Evento para RECHAZAR ccokies (hecho por mi, hay veces q te lleva a Google y te expulsa, otras veces no)
            rejectButton.addEventListener('click', function() {
                window.location.replace('https://www.google.com');
                
            });

        });
const menuToggle = document.getElementById("menuToggle");
const menuDesplegable = document.getElementById("menuDesplegable");

menuToggle.addEventListener("click", () => {
    if (menuDesplegable.style.display === "block") {
        menuDesplegable.style.display = "none";
    } else {
        menuDesplegable.style.display = "block";
    }
});

