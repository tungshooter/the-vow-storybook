#!/bin/bash
# Simple HTTP Server for The Vow Storybook
echo "🚀 Starting local server..."
echo "📖 Open: http://localhost:8000/index-onepage.html"
echo "⏹️  Press Ctrl+C to stop"
echo ""
python3 -m http.server 8000
