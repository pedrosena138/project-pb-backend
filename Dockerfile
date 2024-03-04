FROM node:20-alpine AS base
WORKDIR /home/app

FROM base as build
COPY . .
RUN npm i
RUN npm run build

FROM base as production
COPY package.json package-lock.json prisma/schema.prisma ./
RUN npm i --omit=dev
COPY --from=build home/app/dist ./dist

CMD node dist/server.js
