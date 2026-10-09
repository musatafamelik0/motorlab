from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
import pathlib,os,webbrowser
root=pathlib.Path(__file__).resolve().parent;os.chdir(root)
url='http://127.0.0.1:8081';print('MOTORLAB:',url)
try:webbrowser.open(url)
except:pass
ThreadingHTTPServer(('127.0.0.1',8081),SimpleHTTPRequestHandler).serve_forever()
