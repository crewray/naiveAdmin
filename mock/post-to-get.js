module.exports = function (req, res, next) {
    req.method = "GET";
    next();
  }