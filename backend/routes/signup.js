const {User, validate} = require('../models/user');

module.exports = function (router) {

    var signUpRoute = router.route('/signup');

    signUpRoute.post(async function (req, res) {
        try {
            const {err} = validate(req.body);
            if (err) {
                return res.status(400).send({ message: err.details[0].message });
            }
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(409).send({ message: "User email already exists"});
            }

            await new User().save();
            res.status(201).send({ message: "Successfully created new user" });
        } catch (err) {
            res.status(500).send({ message: "Server error" });
        }
    });

    return router;
}