# GrandMaster AI | Professional Chess Engine

A modern, high-performance Chess AI built with Python (Flask) and Chess.js. This project features a clean, responsive UI with glassmorphism aesthetics and uses common AI algorithms (like Minimax with Alpha-Beta pruning) for decision making.

## 📁 Project Structure

```text
CHESS_AI/
├── src/                    # Source code
│   ├── backend/            # Backend logic (Flask + AI Engine)
│   │   ├── app.py          # Main Flask application
│   │   └── engine.py       # AI move calculation logic
│   └── frontend/           # Frontend assets & templates
│       ├── static/         # Static files (CSS, JS, Images)
│       └── templates/      # HTML templates (index.html)
├── run.py                  # Main entry point to start the application
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore configuration
└── requirements.txt        # Python dependencies
```

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.8 or higher
- Pip (Python package installer)

### 2. Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd CHESS_AI
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### 3. Running the Application
Simply run the root-level `run.py` script:
```bash
python run.py
```
The application will start at `http://127.0.0.1:5003` and will automatically open a browser window.

## 🛠 Features
- **Modern UI**: Dark-themed glassmorphism design.
- **AI Match**: Play against a Chess engine using UCI move logic.
- **Move History**: Visual log of all moves in Standard Algebraic Notation (SAN).
- **Responsive Board**: Interactive board with legal move highlights.

## ⚙ Configuration
Copy `.env.example` to `.env` and adjust the variables if needed:
```bash
cp .env.example .env
```

Available variables:
- `PORT`: Port to run the server (default: 5003)
- `Open_Browser`: Whether to auto-open the browser (True/False)