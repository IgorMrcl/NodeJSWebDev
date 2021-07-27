const express = require("express");
const router = express.Router();

const math = require("../scripts/math");

const processFibo = function (req, res, next) {
    if (req.query.fibonum) {
      res.render("fibonacci", {
        title: "Calculate Fionacci numbers",
        fibonum: req.query.fibonum,
        fiboval: math.fibonacci(req.query.fibonum),
      });
    } else {
      res.render("fibonacci", {
        title: "Calculate Fionacci numbers",
        fibonum: undefined,
      });
    }
  };

const hello = function (req, res, next) {    
    res.render("fibonacci", {
      title: "Calculate Fionacci numbers",
      fibonum: undefined,
    });    
};

const processFiboAsync = function (req, res, next) {
  if (req.query.fibonum) {
    // Calculate using async-aware function, in this server
    math.fibonacciAsync(req.query.fibonum, (err, fiboval) => {
      if (err) next(err);
      else {
        res.render("fibonacci", {
          title: "Calculate Fibonacci numbers",
          fibonum: req.query.fibonum,
          fiboval: fiboval,
        });
      }
    });
  } else {
    res.render("fibonacci", {
      title: "Calculate Fibonacci numbers",
      fiboval: undefined,
    });
  }
};

router.get("/calc", processFibo);
router.get("/calcAsync", processFiboAsync);

router.get("/", hello);


module.exports = router;
