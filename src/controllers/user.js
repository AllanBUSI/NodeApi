const User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    config = require('../config/index'),
    filter = require('../middleware/filter');

exports.login = async(req, res) => {
    const data = Object.assign({ identifiant: '', password: '' }, req.body)

    const where = (!filter.email(data.identifiant)) ? { username: data.identifiant } : { email: data.identifiant }
    const user = await User.findOne(where);

    if (user === null)
        return res.status(409).json({
            error: true,
            message: 'Email/Password error'
        })

    const valid = user.verifyPasswordSync(data.password);
    if (valid) {
        return res.status(200).json({
            error: false,
            token: jwt.sign({
                id: user.get('_id'),
                exp: Math.floor(Date.now() / 1000) + (60 * 60) * 24 * 7,
            }, config.keyToken)
        })
    } else {
        return res.status(409).json({
            error: true,
            message: 'Email/Password error'
        })

    }
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
    return res.status(200).send('OK');
}

exports.forgot_password = (req, res) => {
    res.status(200).send('OK');
}