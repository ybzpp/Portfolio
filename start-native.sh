#!/bin/bash
set -eu
NODE="${NODE:-$(command -v node || true)}"
APP="${APP:-/var/www/portfolio/run}"
PIDFILE="${PIDFILE:-/var/run/portfolio.pid}"
LOG="${LOG:-/var/log/portfolio.log}"

if [ ! -x "$NODE" ] || ! "$NODE" -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 22 ? 0 : 1)'; then
  echo 'Install Node.js 22 or newer before starting the portfolio.' >&2
  exit 1
fi

if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
  exit 0
fi

cd "$APP"
PORT="${PORT:-3000}" HOSTNAME="${HOSTNAME:-127.0.0.1}" nohup "$NODE" server.js >> "$LOG" 2>&1 &
echo $! > "$PIDFILE"
