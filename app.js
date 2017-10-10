const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const index = require('./routes/indexRoute');
const auth = require('./routes/authRoute');
const user = require('./routes/userRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'AseloleJo55',
  resave: false,
  saveUninitialized: true,
}))

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', index);
app.use('/auth', auth);
app.use('/users', user);
app.listen(process.env.PORT || 3000, () => {
  console.log('Hello from port: 3000');
});
