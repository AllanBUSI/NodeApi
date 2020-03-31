module.exports = {
    server: {
        port: 8892,
        env: process.env.NODE_ENV || 'development',
    },
    database: {
        mysql: {
            host: '',
            user: '',
            password: '',
            database: '',
        },
        mongodb: {
            url: '',
            port: '',
            username: '',
            password: '',
        },
        email: {
            sender: {
                default: {
                    name: '',
                    email: ''
                }
            },
            sendgrid: {
                secret: ''
            }
        }
    },
    logger: {
        host: '',
        port: '',
    }
};