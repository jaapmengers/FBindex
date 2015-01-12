FROM dockerfile/nodejs
COPY . /src
RUN cd /src; npm install
RUN npm install -g nodemon
EXPOSE 3000
CMD ["sh", "/src/init.sh"]