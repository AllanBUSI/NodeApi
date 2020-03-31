const user = require('../controllers/user');

/** 
 * login => POST | email;password
 * register => POST | username;email;password
 * forgot_password => POST | emai
 */
module.exports = api => {
    api.route('/auth/login').post(user.login);
    api.route('/auth/register').post(user.register);
    api.route('/auth/forgot_password').post(user.forgot_password);
}