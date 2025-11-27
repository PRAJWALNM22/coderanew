import http.server
import socketserver
import os

PORT = 8001

# Serve from the "client/public" folder
WEB_DIR = os.path.join(os.path.dirname(__file__), 'client', 'public')
os.chdir(WEB_DIR)

class Handler(http.server.SimpleHTTPRequestHandler):
    pass

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🚀 Serving Codera at http://localhost:{PORT}")
    httpd.serve_forever()
