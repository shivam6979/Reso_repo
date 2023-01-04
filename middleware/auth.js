const jwt = require("jsonwebtoken");


const authentication = async function (req, res, next) {
    // token sent in request header 'x-api-key'
    token = req.headers["x-api-key"];

    // if token is not provided
    if (!token) return res.status(400).send({status: false, msg: "Token required! Please login to generate token",
      });

    try {
      // if token is invalid
      let decodedToken = jwt.verify(token, "Group72");
      if (!decodedToken) {
        return res.status(401).send({ status: false, msg: "token is invalid" });
      }
      // if token is valid
      req.userId = decodedToken.userId;
      next();
    } catch (err) {
      res.status(401).send({ status: false, msg: "Authentication Failed" });
    }
  };


  module.exports = { authentication };