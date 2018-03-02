'use strict';

const watson = require('watson-developer-cloud');
const vcapServices = require('vcap_services');

// token endpoints
// **Warning**: these endpoints should probably be guarded with additional authentication & authorization for production use

// speech to text token endpoint
const sttAuthService = new watson.AuthorizationV1(
  Object.assign(
    {
      username: process.env.SPEECH_TO_TEXT_USERNAME, // or hard-code credentials here
      password: process.env.SPEECH_TO_TEXT_PASSWORD
    },
    vcapServices.getCredentials('speech_to_text') // pulls credentials from environment in bluemix, otherwise returns {}
  )
);

exports.getSpeechToTextToken = (req, res) => {
  sttAuthService.getToken(
    {
      url: watson.SpeechToTextV1.URL
    },
    function(err, token) {
      if (err) {
        console.log('Error retrieving token: ', err);
        res.status(500).send('Error retrieving token');
        return;
      }
      res.send(token);
    }
  );
}
