const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/speechy_videosDB')
  .then(() => {
    console.log('Connected to Speechy database');
  })
  .catch(err => {
    console.log('Cannot connect, wrong path');
  })
