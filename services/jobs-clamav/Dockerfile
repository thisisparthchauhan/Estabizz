# Private ClamAV scanner service for Estabizz Jobs.
#
# Built on the official ClamAV image, which ships clamd and freshclam and
# handles signature bootstrapping. Adding Python on top keeps signature
# management with the people who maintain ClamAV rather than reimplementing it.
#
# Pinned to a specific minor release: "latest" would silently change the
# scanning engine underneath a security control.
FROM clamav/clamav:1.4

# python3 is present in the base; add only the pip bootstrap we need.
RUN apk add --no-cache python3 py3-pip

WORKDIR /srv

COPY requirements.txt ./
# --break-system-packages is required on Alpine's externally-managed python.
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt

COPY app ./app
COPY entrypoint.sh /usr/local/bin/estabizz-entrypoint.sh
RUN chmod +x /usr/local/bin/estabizz-entrypoint.sh

# clamd listens on a unix socket under /tmp; nothing is written to disk by the
# wrapper itself, which streams request bytes straight to clamd.
ENV CLAMD_SOCKET=/tmp/clamd.sock \
    PORT=10000 \
    PYTHONUNBUFFERED=1

EXPOSE 10000

# The base image runs clamd as the unprivileged `clamav` user; the entrypoint
# starts the wrapper under the same account rather than as root.
ENTRYPOINT ["/usr/local/bin/estabizz-entrypoint.sh"]
