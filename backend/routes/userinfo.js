const verify = require("../middleware/verifyToken");
const { User, validateAll } = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = function (router) {

    var userInfoRoute = router.route('/userinfo');

    userInfoRoute.get(verify, async function (req, res) {
        const user = await User.findOne({ _id: req.user._id }).then((data) => {
            //console.log(user);
            res.status(200).send({ message: "successfully get information", data: data });
        });
    });

    userInfoRoute.put(verify, async function (req, res) {
        const user = await User.findOne({ _id: req.user._id })
        //console.log(user);
        res.user = user;
        //console.log(res.user)

        if (req.body.firstName != null ? res.user.firstName = req.body.firstName : res.user.firstName = user.firstName);
        if (req.body.lastName != null ? res.user.lastName = req.body.lastName : res.user.lastName = user.lastName);
        if (req.body.email != null ? res.user.email= req.body.email : res.user.email = user.email);
        if (req.body.password != null ? res.user.password = req.body.password : res.user.password = user.password);
        if (req.body.height != null ? res.user.height = req.body.height : res.user.height = user.height);
        if (req.body.weight != null ? res.user.weight = req.body.weight : res.user.weight = user.weight);
        if (req.body.age != null ? res.user.age = req.body.age : res.user.age = user.age);
        if (req.body.gender != null ? res.user.gender = req.body.gender : res.user.gender = user.gender);

        try {
            //console.log("here")
            const {err} = validateAll(req.body);
            if (err) {
                return res.status(400).send({ message: err.details[0].message });
            }
            const dupUser = await User.findOne({ email: req.body.email });
            if (dupUser && dupUser._id != req.user._id) {
                return res.status(409).send({ message: "User email already exists"});
            }
            //console.log("here");
            if (req.body.password != dupUser.password) {
                //console.log(req.body.password)
                //console.log(req.user.password)
                return res.status(400).send({ message: "Incorrect password"});
            }
            //console.log("final")

            await res.user.save();
            res.status(201).send({ message: "Successfully created new user" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    });

    return router;
}