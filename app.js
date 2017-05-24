require('es6-promise').polyfill();
require('isomorphic-fetch');

const express = require('express');
const app = express();

app.get('/api', function(req, res) {
  res.json({ name: 'one1' });
});

// proxy create-react-app
app.get('*', function(req, res) {
  fetch('http://client:3000/index.html')
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.text();
    })
    .then(body => {
      const alterBody = body.replace(
        '<body>',
        '<body><div style="text-align: center; padding: 5px; background-color:papayawhip">-- BOOM --</div>'
      );
      res.send(alterBody);
    });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
