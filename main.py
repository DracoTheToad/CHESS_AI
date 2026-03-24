from flask import Flask, request, jsonify
import chess
import random
from flask_cors import CORS
import webbrowser
import threading
from AI import get_best_move

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/move', methods=['POST'])
def get_move():
    data = request.get_json()
    fen = data.get('fen')

    move = get_best_move(fen)  # 👈 gọi AI.py

    return jsonify({
        "move": move
    })


def open_browser():
    webbrowser.open("http://127.0.0.1:5003")

if __name__ == '__main__':
    threading.Timer(1.0, open_browser).start()
    app.run(host='0.0.0.0', port=5003, debug=True)