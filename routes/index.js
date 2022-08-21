var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  config = {};
  if(process.env.STAGE) {
    config['STAGE'] = process.env.STAGE
  }
  if(process.env.APP_LANG) {
    config['APP_LANG'] = process.env.APP_LANG
  }

  secrets = {};
  if(process.env.SECRET_USERNAME) {
    secrets['SECRET_USERNAME'] = process.env.SECRET_USERNAME
  }
  if(process.env.SECRET_PASSWORD) {
    secrets['SECRET_PASSWORD'] = process.env.SECRET_PASSWORD
  }
  res.render("index", {
    title: "Express",
    env: process.env,
    config: config,
    secrets: secrets
  });
});

module.exports = router;
