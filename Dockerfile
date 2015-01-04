FROM dockerfile/nodejs
COPY . /src
RUN cd /src; npm install
EXPOSE 3000
CMD ["sh", "/src/init.sh"]