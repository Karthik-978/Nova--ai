
from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# 🔑 Add your real OpenAI API key here
openai.api_key = "sk-xxxxxx"

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_input}]
        )

        reply = response.choices[0].message["content"].strip()
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"reply": "Error talking to AI: " + str(e)})

if __name__ == "__main__":
    app.run(debug=True)
