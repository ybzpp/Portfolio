#!/bin/bash
NODE=/tmp/node-v20.19.0-linux-x64/bin/node
APP=/var/www/portfolio/run
PIDFILE=/var/run/portfolio.pid
LOG=/var/log/portfolio.log

if [ ! -x "$NODE" ]; then
  curl -fsSL https://nodejs.org/dist/v20.19.0/node-v20.19.0-linux-x64.tar.xz -o /tmp/node.tar.xz
  tar -xf /tmp/node.tar.xz -C /tmp
fi

if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
  exit 0
fi

cd "$APP"
PORT=3000 HOSTNAME=0.0.0.0 nohup "$NODE" server.js >> "$LOG" 2>&1 &
echo $! > "$PIDFILE"
