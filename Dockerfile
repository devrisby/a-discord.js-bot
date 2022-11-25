# src: https://logfetch.com/docker-typescript-production/
FROM node:18 as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm set-script prepare ''
RUN npm install
COPY . ./
RUN npm run build

FROM node:18
WORKDIR /usr/app
COPY package*.json ./
RUN npm set-script prepare ''
RUN npm install --omit=dev
COPY --from=ts-compiler /usr/app/build ./build
RUN chown -R node:node ./
USER node
CMD ["npm", "run", "start:prod"]