FROM node:20-slim as build
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install --verbose --legacy-peer-deps
COPY . .
RUN npm run build --verbose

FROM nginx:1.25-alpine3.18
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]