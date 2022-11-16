const verify = require("../middleware/verifyToken");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = function (router) {

    var homeRoute = router.route('/home');

    homeRoute.get(verify, async function (req, res) {
        //console.log("called");

        const user = await User.findOne({ _id: req.user._id }).then((data) => {
            //console.log(user);
            res.status(200).send({ message: "successfully get information", data: data });
        });

    });

    return router;
}