const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const header = req.headers.authorization
  console.log(header);
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[0];
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }
        console.log(req.user, "before");
        req.user = user;
        console.log(req.user, "after");
        next();
      });
    }
  }
  else return res.status(401).json({ message: "Unauthorized" });
};
module.exports = { checkToken };
