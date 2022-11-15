const {User, validate} = require('../models/user');

module.exports = function (router) {

    var signUpRoute = router.route('/signup');

    signUpRoute.get(async function (req, res) {
        try {
            const users = await User.find();
            res.status(200).json({ users });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    signUpRoute.post(async function (req, res) {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })

        try {
            const {err} = validate(req.body);
            if (err) {
                return res.status(400).send({ message: err.details[0].message });
            }
            const dupUser = await User.findOne({ email: req.body.email });
            if (dupUser) {
                return res.status(409).send({ message: "User email already exists"});
            }
            console.log("here");

            await new User({ ...req.body }).save();
            res.status(201).send({ message: "Successfully created new user" });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    });

    return router;
}