from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import traceback

app = Flask(__name__)
CORS(app)

# Inicialización oficial del cliente de Gemini
client = genai.Client(api_key="AQ.Ab8RN6LBmmgzxEh-4168o6jQSuIc7q6e0OdLmyHOz4TyReWPcQ")

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
        
        # Llamada optimizada usando el modelo actual
        response = client.models.generate_content(
            model='gemini-3.8-flash',
            contents=prompt_completo
        )

        return jsonify({"respuesta": response.text})
    
    except Exception as e:
        print("--- ERROR DETALLADO EN EL SERVIDOR ---")
        traceback.print_exc()
        return jsonify({"respuesta": "Lo siento, ha ocurrido un error interno al procesar tu mensaje."}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
