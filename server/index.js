require('dotenv').config();
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes/schema-routes');
const { log: wrapLog } = require("./utils/loging");

console.log = wrapLog(console.log);
console.warn = wrapLog(console.warn);
console.error = wrapLog(console.error);


const { SERVER_PORT } = process.env;

const main = async () => {
  const app = express();
  const server = require('./utils/serverStart')(app);
  
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'ui')));
  app.use(cors());

  routes(app);

  server.listen(SERVER_PORT, async () => {
    console.log(`Server started on port ${SERVER_PORT}`);
  });
  
  mongoose.connect('mongodb://127.0.0.1:27017/clinic', { useNewUrlParser: true })
  .then(() => console.log('Connected successfully to clinic db!'))
  .catch(err => console.error(err));
mongoose.Promise = global.Promise;

}

main().catch(e => {
    console.log(e);
    process.exit(1);
});
