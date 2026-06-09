FROM node:20-bookworm-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY tsconfig.json bootstrap.js ./
COPY src ./src
RUN npm run build

FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json* bootstrap.js ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

ENV HTTP_HOST=0.0.0.0
ENV HTTP_PORT=7001

EXPOSE 7001

CMD ["npm", "start"]
