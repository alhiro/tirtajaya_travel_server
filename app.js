const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const config = require('./config/config');
const passport = require('passport');
const cookieSession = require('cookie-session');
const serveIndex = require('serve-index');
const initDB = require('./models/index');
const path = require('path');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Router
const authRouter = require('./routes/users');
const dashboardRouter = require('./routes/dashboard');
const employeeRouter = require('./routes/employee');
const customerRouter = require('./routes/customer');
const addressRouter = require('./routes/address');
const carRouter = require('./routes/car');
const categoryPackageRouter = require('./routes/category');
const categorySubPackageRouter = require('./routes/category_sub');
const packageRouter = require('./routes/package');
const senderPackageRouter = require('./routes/sender');
const recipientPackageRouter = require('./routes/recipient');
const courierPackageRouter = require('./routes/courier');
const goSendPackageRouter = require('./routes/go_send');
const passengerPackageRouter = require('./routes/passenger');
const waybillPackageRouter = require('./routes/waybill');
const destinationPackageRouter = require('./routes/destination');

// setup app with predefined configs
config.init(app);

app.use('/ftp', express.static('public'), serveIndex('public', {'icons': true}));

// enable CORS
app.use(cors());

// add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions
// set static file
app.use(express.static(path.join(__dirname, 'views')));

// set the endpoint paths
app.use(process.env.APP_API_PREFIX + '/auth', authRouter);
app.use(process.env.APP_API_PREFIX + '/dashboard', dashboardRouter);
app.use(process.env.APP_API_PREFIX + '/employee', employeeRouter);
app.use(process.env.APP_API_PREFIX + '/customer', customerRouter);
app.use(process.env.APP_API_PREFIX + '/address', addressRouter);
app.use(process.env.APP_API_PREFIX + '/car', carRouter);
app.use(process.env.APP_API_PREFIX + '/category', categoryPackageRouter);
app.use(process.env.APP_API_PREFIX + '/category-sub', categorySubPackageRouter);
app.use(process.env.APP_API_PREFIX + '/package', packageRouter);
app.use(process.env.APP_API_PREFIX + '/sender', senderPackageRouter);
app.use(process.env.APP_API_PREFIX + '/recipient', recipientPackageRouter);
app.use(process.env.APP_API_PREFIX + '/courier', courierPackageRouter);
app.use(process.env.APP_API_PREFIX + '/go-send', goSendPackageRouter);
app.use(process.env.APP_API_PREFIX + '/passenger', passengerPackageRouter);
app.use(process.env.APP_API_PREFIX + '/waybill', waybillPackageRouter);
app.use(process.env.APP_API_PREFIX + '/destination', destinationPackageRouter);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Tirta Jaya Travel API with Swagger",
      version: "0.0.1",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "ali",
        url: "https://",
        email: "mpustaka@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const specs = swaggerJsdoc(options);
app.use(
  process.env.APP_API_PREFIX + "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Tirta Jaya Travel application v.0.0.1" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // res.status(404).render('404.jade');

  res.status(404);
  res.send('404: File Not Found');

  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
});

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  if (err.name === 'Unauthorized Error') {
    res.json({
      error: err
    }).status(401)

  } else if (res.finished !== true) {
    console.error(err)
    res.json({
      error: err
    }).status(500)
  }
})

app.set('port', process.env.PORT || 8080);
var server = app.listen(app.get('port'), function() {
  initDB;
  console.log('Express server listening on port ' + server.address().port);
});
// set html view with ejs render file
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

module.exports = app;
