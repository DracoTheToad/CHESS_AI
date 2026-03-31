import sys
import os

# Add src to python path to allow absolute imports
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

if __name__ == '__main__':
    from src.backend.app import app, open_browser, threading
    
    port = int(os.environ.get('PORT', 5003))
    
    # Only open browser in the main process, not in the Werkzeug reloader process
    if os.environ.get('WERKZEUG_RUN_MAIN') != 'true':
        threading.Timer(1.0, open_browser).start()
        
    app.run(host='0.0.0.0', port=port, debug=True)
