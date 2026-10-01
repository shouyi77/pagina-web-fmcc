import os
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import traceback

# Forzamos la carga del archivo .env de forma directa
load_dotenv(override=True)

app = Flask(__name__)
CORS(app)

# Comprobación de la clave
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("¡Error! No se ha podido leer la clave del archivo .env.")

client = genai.Client(api_key=api_key)

CONTEXTO_HOTEL = """
Eres el recepcionista virtual del hotel 'La Palma Princess' y 'Esencia de La Palma' situado en Fuencaliente, La Palma.
Información oficial del hotel:
- Ubicación: Carretera de la Costa, Fuencaliente, 38740 La Palma, Islas Canarias.
- Instalaciones: Cuenta con 11 piscinas al aire libre (7 en La Palma Princess y 4 en Esencia de La Palma).
- Teléfono de contacto: +34 900 123 456.
- Correo: info@tupagina.com.
"""

@app.route('/chat', methods=['POST'])
def chat():
    try:
        datos = request.get_json()
        if not datos or "mensaje" not in datos:
            return jsonify({"respuesta": "No se ha recibido ningún mensaje."}), 400

        pregunta_usuario = datos.get("mensaje", "")
        prompt_completo = f"{CONTEXTO_HOTEL}\n\nPregunta del cliente: {pregunta_usuario}"
        
        response = None
        # Sistema de reintento automático por si Google sufre saturación puntual (503)
        for intento in range(3):
            try:
                response = client.models.generate_content(
                    model='gemini-3.8-flash',
                    contents=prompt_completo
                )
                break
            except Exception as e_google:
                if "503" in str(e_google) and intento < 2:
                    time.sleep(1.5)  # Espera 1.5 segundos y reintenta
                    continue
                raise e_google

        return jsonify({"respuesta": response.text})
    
    except Exception as e:
        print("--- ERROR DETALLADO EN EL SERVIDOR ---")
        traceback.print_exc()
        return jsonify({"respuesta": "Lo siento, los servidores de Google están experimentando un pico de tráfico temporal. Vuelve a enviar el mensaje en unos segundos."}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
