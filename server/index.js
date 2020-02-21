const express = require('express');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router.js');
const schema = require('../GraphQL/schema.js');
const app = express();

// To any route directed to graphql it will be directed to GraphQL
// Development tool, Postman
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
    console.log('LISTENING PORT 4000')
});

