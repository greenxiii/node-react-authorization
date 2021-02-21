const express = require('express');
var cors = require('cors')
const http = require('http');
const mongoose = require('mongoose');
const passport = require('passport');
const apiRouter = require('./modules/router');
const MongoURL = require('./constants').MongoURL;

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.NODE_HOST || '0.0.0.0';

// Passport config
require('./config/passport')(passport);

const server = http.createServer(app);

app.set('port', port);

// Json/formData parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors settings
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(apiRouter);

server.on('error', () => {
  console.log('Server error');
});

server.on('listening', () => {
  const addr = server.address();

  console.log(`Listening on ${typeof addr === 'string' ? addr : `http://${addr.address}:${addr.port}`}`);
});

const start = async () => {
  mongoose.connect(MongoURL, { useNewUrlParser: true }).then(mongoConnection => {
    server.listen(port, host);
  }).catch(err => {
    console.error('Server MongoDB connect error', err);
    process.exit();
  });
};

start();