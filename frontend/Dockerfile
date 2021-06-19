FROM node:14-alpine  
 
# set your working directory  
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install application dependencies  
COPY package.json ./  
COPY package-lock.json ./  
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
