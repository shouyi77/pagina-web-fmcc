document.addEventListener("DOMContentLoaded", () => {

    // --- COOKIES ---
    const cookieContainer = document.getElementById("cookieContainer");
    const acceptButton = document.getElementById("acceptCookies");
    const rejectButton = document.getElementById("rejectCookies");

    if (acceptButton && cookieContainer) {
        acceptButton.addEventListener("click", () => {
            cookieContainer.style.display = "none";
        });
    }

    if (rejectButton) {
        rejectButton.addEventListener("click", () => {
            window.location.href = "https://www.google.com";
        });
    }

    // --- MENÚ LATERAL (SIDEBAR) ---
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

    // --- FECHAS DINÁMICAS DEL BUSCADOR ---
    const inputEntrada = document.getElementById("entrada");
    const inputSalida = document.getElementById("salida");

    if (inputEntrada && inputSalida) {
        // Poner fecha mínima de hoy
        const hoy = new Date().toISOString().split("T")[0];
        inputEntrada.min = hoy;
        inputSalida.min = hoy;

        // Cuando cambie la entrada, actualizar el mínimo de la salida
        inputEntrada.addEventListener("change", () => {
            const fechaEntradaVal = inputEntrada.value;
            inputSalida.min = fechaEntradaVal;
            if (inputSalida.value && inputSalida.value < fechaEntradaVal) {
                inputSalida.value = fechaEntradaVal;
            }
        });
    }

    // --- LÓGICA DEL CHATBOT ---
    const chatbotToggleBtn = document.getElementById("chatbot-toggle-btn");
    const chatbotWindow = document.getElementById("chatbot-window");
    const chatbotCloseBtn = document.getElementById("chatbot-close-btn");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSendBtn = document.getElementById("chatbot-send-btn");
    const chatbotMessages = document.getElementById("chatbot-messages");

    if (chatbotToggleBtn && chatbotWindow && chatbotCloseBtn) {
        chatbotToggleBtn.addEventListener("click", () => {
            chatbotWindow.style.display = "flex";
            chatbotToggleBtn.style.display = "none";
        });

        chatbotCloseBtn.addEventListener("click", () => {
            chatbotWindow.style.display = "none";
            chatbotToggleBtn.style.display = "block";
        });
    }

    const sendMessage = () => {
        if (!chatbotInput) return;
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

        // --- CONEXIÓN CON FLASK (GEMINI) ---
        fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mensaje: text })
        })
        .then(response => response.json())
        .then(data => {
            const botMsg = document.createElement("div");
            botMsg.classList.add("msg-bot");
            botMsg.textContent = data.respuesta;
            chatbotMessages.appendChild(botMsg);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMsg = document.createElement("div");
            errorMsg.classList.add("msg-bot");
            errorMsg.textContent = "Lo siento, ha ocurrido un error al conectar con el servidor.";
            chatbotMessages.appendChild(errorMsg);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        });
    };

    if (chatbotSendBtn && chatbotInput) {
        chatbotSendBtn.addEventListener("click", (e) => {
            e.preventDefault();
            sendMessage();
        });

        chatbotInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});
