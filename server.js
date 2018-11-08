const express = require('express');
const  app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
app.use(cors());
const jsforce = require('jsforce');


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const port = process.env.PORT || '4900';  //port setting
app.set('port', port);
app.listen(port, ()=> console.log(`Listening at localhost:${port}`));

//start mysql connection

const conn = new jsforce.Connection();
conn.login('ranjisona@gmail.com', 'Ranjitha@3218FmFx7NntsigkGqzZlmdrFZ9', function(err, res) {
  if (err) { return console.error(err); }
  console.log('connected');

  app.get('/events', function (req, res) {
    conn.query('select id,Subject,StartDateTime,EndDateTime,Location,CreatedById from Event', function (error, results, fields) {
      if (err) { return console.error(err); }
      if(results) {
        console.log(results);
        res.end(JSON.stringify(results));
        conn.logout(function(err) {
          if (err) { return console.error(err); }
          // now the session has been expired.
        });
      }
    });
  });
});
