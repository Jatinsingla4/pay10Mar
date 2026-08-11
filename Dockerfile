# Local test image only — not the production deploy path (that's git pull +
# pm2 on the staging host, see deploy/). Built two ways:
#   1. `docker build -t pay10-test .`                     -> dummy values below,
#      enough for scripts/test-rate-limit.sh (rate limiting never reads them).
#   2. `bash scripts/docker-run-prod-like.sh`              -> real values from
#      .env.local, baked in via --build-arg, for testing reCAPTCHA/full-stack
#      behavior end to end.
#
# Real secrets end up in this image's layers when built the second way — that
# image must never be pushed to a registry or shared, local testing only.
FROM node:20.20.2-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_API=https://example.invalid
ARG NEXT_PUBLIC_IMAGE_URL=https://example.invalid
ARG SITE_ORIGIN=http://localhost:3186
ARG BACKEND_AUTH_KEY=test-key
ARG RECAPTCHA_SECRET_KEY=test-secret
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY=""
ARG TRUSTED_PROXY_COUNT=1

ENV NEXT_PUBLIC_API=$NEXT_PUBLIC_API
ENV NEXT_PUBLIC_IMAGE_URL=$NEXT_PUBLIC_IMAGE_URL
ENV SITE_ORIGIN=$SITE_ORIGIN
ENV BACKEND_AUTH_KEY=$BACKEND_AUTH_KEY
ENV RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV TRUSTED_PROXY_COUNT=$TRUSTED_PROXY_COUNT
ENV NODE_ENV=production

RUN npm run build

EXPOSE 3186
CMD ["npm", "start"]
