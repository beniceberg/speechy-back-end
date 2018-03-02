/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/* eslint-env node, es6 */

const express = require('express');
const app = express();
const vcapServices = require('vcap_services');
const webpack = require('webpack');
const cors = require('cors');
const bodyParser = require('body-parser');
// require('dotenv').config();

// allows environment properties to be set in a file named .env
require('dotenv').load({ silent: true });

const routes = require('./routes/router');

app.use(cors());
// on bluemix, enable rate-limiting and force https
// if (process.env.VCAP_SERVICES) {
//   // enable rate-limiting
//   const RateLimit = require('express-rate-limit');
//   app.enable('trust proxy'); // required to work properly behind Bluemix's reverse proxy
//
//   const limiter = new RateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 300, // limit each IP to 100 requests per windowMs
//     delayMs: 0 // disable delaying - full speed until the max limit is reached
//   });
//
//   //  apply to /api/*
//   app.use('/api/', limiter);
//
//   // force https - microphone access requires https in Chrome and possibly other browsers
//   // (*.mybluemix.net domains all have built-in https support)
//   const secure = require('express-secure-only');
//   app.use(secure());
// }

// app.use(bodyParser.json());

app.use('', routes);

const port = process.env.PORT;

app.listen(port, function() {
  console.log('Speechy server live at http://localhost:%s/', port);
});

// Chrome requires https to access the user's microphone unless it's a localhost url so
// this sets up a basic server on port 3001 using an included self-signed certificate
// note: this is not suitable for production use
// however bluemix automatically adds https support at https://<myapp>.mybluemix.net
if (!process.env.VCAP_SERVICES) {
  const fs = require('fs');
  const https = require('https');
  const HTTPS_PORT = 3001;

  const options = {
    key: fs.readFileSync(__dirname + '/keys/localhost.pem'),
    cert: fs.readFileSync(__dirname + '/keys/localhost.cert')
  };
  https.createServer(options, app).listen(HTTPS_PORT, function() {
    console.log('Secure server live at https://localhost:%s/', HTTPS_PORT);
  });
}
