FROM alpine

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN yarn add puppeteer@13.5.0 \
    && yarn global add pm2

RUN apk add sudo

RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

LABEL authors="Waves Production" \
      org.label-schema.vendor="Waves Labs Backend" \
      org.label-schema.name="Waves Labs Backend Docker Image" \
      org.label-schema.description="Waves Labs Backend" \
      org.label-schema.url="https://waveslabs.com" \
      org.label-schema.schema-version="1.0"

ENV NODE_ENV="production" \
    PORT="3000" \
    USER="pptruser" \
    LABEL="Waves Labs Backend" \
    NODE_OPTIONS="--max_old_space_size=2048"

WORKDIR /home/$USER

USER $USER

COPY --chown=$USER:$USER . .

RUN yarn

CMD ["pm2-runtime", "start", "ecosystem.config.js"]

