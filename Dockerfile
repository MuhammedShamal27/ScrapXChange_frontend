#Base image for Node.js
FROM  node:20-alpine AS build
#Set working directory inside the container
WORKDIR /usr/src/app
#Copy package.json and install dependencies
COPY package.json package-lock.json ./

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
#Command to run Vite in development mode
CMD [ "nginx", "-g", "daemon off;" ]