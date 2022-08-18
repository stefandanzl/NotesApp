FROM node:17

#Working Dir
WORKDIR /notes_server

#Copy Package Json Files
COPY package*.json ./

#Install Prettier

#Install Files
RUN npm install

#Copy Source Files -> Copy everything to workdirectory
COPY . .

#Build
#RUN npm run build

#Exprose the API Port
EXPOSE 8081

CMD ["node","server.js"]