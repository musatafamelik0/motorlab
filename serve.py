from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os, webbrowser
ROOT=Path(__file__).resolve().parent
os.chdir(ROOT)
url='http://127.0.0.1:8081'
print('MOTORLAB:',url)
try:webbrowser.open(url)
except:pass
ThreadingHTTPServer(('127.0.0.1',8081),SimpleHTTPRequestHandler).serve_forever()
