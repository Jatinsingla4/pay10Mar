# Local test image only — not the production deploy path (that's git pull +
# pm2 on the staging host, see deploy/). Just enough to run `next start` and
# exercise proxy.js's in-memory rate limiter from outside the container.
FROM node:20.20.2-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Dummy values so the build doesn't fail on missing envs — rate limiting
# happens in middleware before any of these are read, so they don't need to
# be real for this test.
ENV NEXT_PUBLIC_API=https://example.invalid
ENV NEXT_PUBLIC_IMAGE_URL=https://example.invalid
ENV SITE_ORIGIN=http://localhost:3186
ENV BACKEND_AUTH_KEY=test-key
ENV RECAPTCHA_SECRET_KEY=test-secret
ENV NODE_ENV=production

RUN npm run build

EXPOSE 3186
CMD ["npm", "start"]
