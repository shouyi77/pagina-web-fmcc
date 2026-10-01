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

    // ==========================================
    // INICIO: LÓGICA DEL CHATBOT AÑADIDA
    // ==========================================
    
    const chatbotToggleBtn = document.getElementById("chatbot-toggle-btn");
    const chatbotWindow = document.getElementById("chatbot-window");
    const chatbotCloseBtn = document.getElementById("chatbot-close-btn");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSendBtn = document.getElementById("chatbot-send-btn");
    const chatbotMessages = document.getElementById("chatbot-messages");

    if (chatbotToggleBtn && chatbotWindow && chatbotCloseBtn) {
        // Abrir la ventana del chat
        chatbotToggleBtn.addEventListener("click", () => {
            chatbotWindow.style.display = "flex";
            chatbotToggleBtn.style.display = "none";
        });

        // Cerrar la ventana del chat
        chatbotCloseBtn.addEventListener("click", () => {
            chatbotWindow.style.display = "none";
            chatbotToggleBtn.style.display = "block";
        });
    }

    const sendMessage = () => {
        const text = chatbotInput.value.trim();
        if (text === "") return;

        // Mostrar mensaje del usuario
        const userMsg = document.createElement("div");
        userMsg.classList.add("msg-user");
        userMsg.textContent = text;
        chatbotMessages.appendChild(userMsg);

        // Limpiar el input y bajar el scroll
        chatbotInput.value = "";
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Simular una respuesta del servidor (Backend simulado)
        setTimeout(() => {
            const botMsg = document.createElement("div");
            botMsg.classList.add("msg-bot");
            botMsg.textContent = "Hemos recibido tu mensaje. Por favor, espera mientras te contactamos con un agente de La Palma Princess.";
            chatbotMessages.appendChild(botMsg);
            
            // Bajar el scroll al nuevo mensaje
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1200);
    };

    if (chatbotSendBtn && chatbotInput) {
        // Enviar por click en el botón
        chatbotSendBtn.addEventListener("click", sendMessage);

        // Enviar por tecla "Enter"
        chatbotInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                sendMessage();
            }
        });
    }

    // ==========================================
    // FIN: LÓGICA DEL CHATBOT AÑADIDA
    // ==========================================

});

const box = document.getElementById("dragBox");

// Verifica si dragBox existe para evitar errores en consola si no está en el HTML
if (box) {
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
}
