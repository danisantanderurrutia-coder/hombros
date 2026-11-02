#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
cd /Applications/Hombros
exec /opt/homebrew/bin/npm run dev -- --host 0.0.0.0 --port 5173
