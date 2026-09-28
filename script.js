// Esperamos a que todo el contenido del documento HTML esté cargado en el navegador
        document.addEventListener('DOMContentLoaded', function() {
            
            // Obtenemos las referencias a los elementos HTML por su ID
            const cookieContainer = document.getElementById('cookieContainer');
            const acceptButton = document.getElementById('acceptCookies');

            // Añadimos un "escuchador de eventos" (event listener) al botón de aceptar
            acceptButton.addEventListener('click', function() {
                // Al hacer clic, añadimos la clase 'hidden' (definida en CSS) al contenedor,
                // lo que hace que desaparezca de la pantalla.
                cookieContainer.classList.add('hidden');
                
                // (Opcional) Aquí se podría guardar en localStorage que el usuario aceptó
                // para que no vuelva a salir si recarga la página:
                // localStorage.setItem('cookiesAceptadas', 'true');
            });

            // (Opcional) Lógica para comprobar si ya estaban aceptadas previamente
            // if (localStorage.getItem('cookiesAceptadas') === 'true') {
            //     cookieContainer.classList.add('hidden');
            // }
        });
