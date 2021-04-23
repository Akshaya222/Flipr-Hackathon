const {createUser, updateUser, findUserByEmail} = require('../dbServices/user');

exports.register = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(200).json({message: 'User registered', data: user});
    } catch (e) {
        res.status(400).json({message: e.message});
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await findUserByEmail(email);
        if (! user) {
            res.status(401).json({message: "No such user"});
            return;
        }
        // match user password
        const matched = await user.matchPassword(password, user.password);
        if (! matched) {
            res.status(401).json({message: 'Invalid login'});
            return;
        }
        res.status(201).json({
            message: "Logged In", data: user
        });

    } catch (e) {
        res.status(401).json({message: e.message});
    }
};