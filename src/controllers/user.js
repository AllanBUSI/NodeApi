const User = require('../models/user'),
    filter = require('../middleware/filter');

exports.login = (req, res) => {
    res.status(200).send('OK');
}

exports.register = async(req, res) => {
    const data = Object.assign({ email: '', password: '', username: '' }, req.body)

    if (!filter.email(data.email) || data.password < 5 || data.username < 4)
        return res.status(400).json({
            error: true,
            message: 'Syntaxe request error'
        })

    const getEmail = await User.findOne({ email: data.email });
    console.log(getEmail)
    const getUsername = await User.findOne({ username: data.username });
    if (getEmail !== null || getUsername !== null)
        return res.status(409).json({
            error: true,
            message: 'Email/Username existe'
        })
    const newUser = new User({ email: data.email, password: data.password, username: data.username })
    newUser.save().then(() => {
        console.log('User register');
        res.status(200).send('OK');
    }).catch((error) => {
        console.log(error);
    })
    res.status(200).send('OK');
}

exports.forgot_password = (req, res) => {
    res.status(200).send('OK');
}