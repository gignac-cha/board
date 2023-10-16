FROM node AS prebuild
RUN corepack enable
WORKDIR /tmp
COPY . ./
RUN pnpm install

FROM node:alpine
RUN apk add --no-cache postgresql
RUN corepack enable
WORKDIR /home/server/read/fastify
COPY --from=prebuild /tmp/node_modules node_modules
RUN pnpm run build
ENTRYPOINT [ "node", "dist/server.js" ]
