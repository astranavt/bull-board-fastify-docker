FROM node:16-alpine3.15

ENV PORT 3000
ENV NODE_ENV production

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY dist dist


RUN yarn --production --silent

EXPOSE $PORT

CMD ["node", "dist/index.js"]