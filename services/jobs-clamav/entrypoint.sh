#!/bin/sh
# Starts clamd (via the base image's own init, which also runs freshclam) and
# then the HTTP wrapper in the foreground.
#
# The wrapper is the foreground process so the container's lifetime tracks it.
# /health independently reports 503 until clamd is reachable AND has loaded
# signatures, so the platform will not route traffic to a scanner that cannot
# yet scan -- which is why clamd starting in the background is safe here.
set -eu

# --- clamd, backgrounded -----------------------------------------------------
/init &

# --- HTTP wrapper, foreground ------------------------------------------------
# Drop to the unprivileged clamav account when the platform started us as root.
if [ "$(id -u)" = "0" ] && command -v su-exec >/dev/null 2>&1; then
  exec su-exec clamav python3 -m uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-10000}"
fi

exec python3 -m uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-10000}"
