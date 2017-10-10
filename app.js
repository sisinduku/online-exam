const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const question = require('./routes/question.js')
const exam = require('./routes/exam.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'AseloleJo55',
  resave: false,
  saveUninitialized: true,
}))

app.use('/questions', question)
app.use('/exams', exam)

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000, () => {
  console.log('Hello from port: 3000');
});
