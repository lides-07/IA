pip install flask openai flask-cors
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Set OpenAI API key (replace 'your-api-key' with your actual OpenAI API key)
openai.api_key = 'chatgpt'

@app.route('/api/ask', methods=['POST'])
def ask_ai():
    data = request.json
    question = data.get("question")

    if not question:
        return jsonify({"error": "No question provided"}), 400

    try:
        # Using GPT-4 to generate the answer
        response = openai.Completion.create(
            model="gpt-4",  # Use GPT-4 model
            prompt=question,
            max_tokens=150,
            temperature=0.7,  # Adjust this parameter for more or less creativity
        )

        answer = response.choices[0].text.strip()

        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
