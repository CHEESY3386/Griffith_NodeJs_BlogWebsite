FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY blog-website/ ./blog-website/
RUN cd blog-website && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/blog-website/build ./blog-website/build
COPY api/package*.json ./api/
RUN cd api && npm install
COPY api/app.js ./api/

EXPOSE 8080

CMD ["node", "./api/app.js"]