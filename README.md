# Speechy-server

Speechy-server is the back-end for speechy app.

## What is Speechy?
[Speechy](https://github.com/beniceberg/speechy) is a full stack open-source project, currently in development, concentrated on improving public speeches and presentations. The platform lets you record your speech, returning a detailed page analysing your content and performance. Keeping track of previous attempts and preparations and providing aid on how to improve. Using React and Redux in the frontend, Express and MongoDB (Mongoose) in the backend and the IBM Watson speech-to-text API.



## Tech Stack:

# Front-end:

* React
* Redux
* Webpack

# Back-end: 

* Koa
* IBM Watson
* MongoDB
* MongoLab
* Travis CI
* Heroku



## Using Speechy-server

A few things you have to take in consideration before using Speechy-server

After cloning the repo you'll have to :

### Install global and local dependancies:

* NPM

* Node

## Two options using the database

### 1. You use an online database

In this case you should: 

* Create a free account at [mLab](https://mlab.com/)
* Create a .env file containing: 

    ```javascript
    DB_USERNAME=YOUR_DB_USERNAME
    DB_PASSWORD=YOUR_DB_PASSWORD
    DB_HOST=YOUR_DB_HOST
    DB_PORT=YOUR_DB_PORT
    DB_NAME=YOUR_DB_NAME
    ```

 ### Connet to Database

In the shell type:

 `$mongo YOUR_DB_HOST.mlab.com:YOUR_DB_PORT/YOUR_DB_NAME -u YOUR_DB_USERNAME -p YOUR_DB_PASSWORD`


### 2. You can use your local database

In this case you should:

* In the db.js-file uncomment the section marked as 'LOCAL DATABASE' and comment out the section marked 'mLAB DATABASE'

### Connet to Database

In the shell type:

* `$mongod`
* `$mongo`       (In another tab)



## Start the server

In the shell type:

`$npm start`

**Happy hacking!!**



## Use Postman for HTTP requests

Use this link to get all requests: [Speechy end-points](https://www.getpostman.com/collections/8ba1f3f8e1f16e2e8e21).

Don't forget to create a new Environment (http://localhost:3002).
