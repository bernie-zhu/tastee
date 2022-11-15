const User = require("../models/user");
const Joi = require("joi");

module.exports = function (router) {

    var loginRoute = router.route('/login');

    loginRoute.post(async function (req, res) {
        try {
            const err = validate(req.body);
            if (err) {
                return res.status(400).send({ message: err.details[0].message });
            }

            const user = await User.findOne({ email: req.body.email });
            if (user == null) {
                return res.status(401).send({ mesage: "Invalid Email or Password "});
            }

            res.status(200).send({ message: "Logged in successfully "});
            
        } catch (err) {
            res.status(500).sned({ message: "Server error" });
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