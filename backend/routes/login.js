const { User } = require("../models/user");
const Joi = require("joi");

module.exports = function (router) {

    var loginRoute = router.route('/login');

    loginRoute.post(async function (req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (user == null) {
                return res.status(401).send({ message: "Invalid Email" });
            }

            if (user.password == req.body.password) {
                const token = user.generateAuthToken();
                //console.log(token);
                res.header('auth-token', token).status(200).send({ message: "Logged in successfully", data: token });
            } else {
                res.status(404).send({ message: "Incorrect Password" });
            }
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    });

    return router;
}

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
}