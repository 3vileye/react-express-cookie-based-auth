const express = require('express');
const cors = require('cors');
// import { HandleError } from './errorHandler/ErrorHandler';
const HandleError = require('./errorHandler/ErrorHandler');
// const requestCheck = require('./middlewares/reqCheck.mdlwre');
// import { requestCheck } from './middlewares/reqCheck.mdlwre';
const morgan = require("morgan");
require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser')


//middlewares
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  methods: ['GET', 'PUT', 'POST'],
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(function (req, res, next) {  
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-powered-by", 'curosity is a curse');
    next();
  });
app.use('/auth',require(`./routes/NoAuth`));
// app.use(requestCheck);
// app.use('/api', require(`./routes/api`));
app.use(HandleError);
const port = process.env.PORT || 8000;

app.listen(port,() => console.log(`server runing on port ${port}`));