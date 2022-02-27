require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

// import middlewares
const errorHandler = require('./middleware/errorHandler');
const routerNotFound = require('./middleware/routerNotFound');

// import routers

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 20, // limit each IP to 10 requests per windowMs
});

app.use(limiter);
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors());

// routes
app.use('/', (req, res) => res.send({ message: 'hi' }));

// routes not founds
app.use(routerNotFound);
app.use(errorHandler);

// Server
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
