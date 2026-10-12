import sys
import os

# Ensure backend root is on sys.path for serverless execution
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(CURRENT_DIR)
if PARENT_DIR not in sys.path:
    sys.path.insert(0, PARENT_DIR)

from main import app as base_app

# ASGI middleware to fix Vercel rewrite paths
async def app(scope, receive, send):
    if scope.get("type") == "http":
        headers = dict(scope.get("headers", []))
        matched_path = headers.get(b"x-matched-path")
        if matched_path:
            try:
                scope["path"] = matched_path.decode("utf-8")
            except Exception:
                pass
        elif scope.get("path") in ["/api/index.py", "/index.py"]:
            scope["path"] = "/"
    await base_app(scope, receive, send)
