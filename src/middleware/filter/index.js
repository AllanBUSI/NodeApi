module.exports = {
    email: (email) => {
        return (
            email === undefined ||
            email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null
        ) ? false : (email.length > 10) ? true : false
    },
    password: (password) => {
        return (
            password === undefined ||
            password.matchmatch(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})$/) == null
        ) ? false : (password.length > 6) ? true : false
    },
}