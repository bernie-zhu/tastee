const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("auth-token");
    //console.log(token)
    //console.log(req.header("auth-token"))

    if (!token) return res.status(401).send({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        //console.log("here")
        //console.log(verified)
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ message: "invalid token" });
    }
}