FROM dockerfile/nodejs-bower-grunt
COPY . /src
RUN npm install -g nodemon
RUN cd /src; npm install
RUN apt-get update && apt-get install -y ruby
RUN gem install sass
RUN cd /src; bower install --allow-root && grunt 
EXPOSE 3000
CMD ["sh", "/src/init.sh"]