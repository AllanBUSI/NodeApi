const cors = require('cors'), // CORS est un package node.js pour fournir un middleware sous Express qui peut être utilisé pour activer CORS avec diverses options.
    express = require('express'),
    route = require('./src/routes'), // Apport des route créé
    config = require('./src/config'),
    bodyParser = require('body-parser'),
    logger = require('./src/utils/logger');


const api = express();
route(api);

api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

api.use(express.static('public'));

api.use(cors());

api.use(bodyParser.urlencoded({
    extended: false
}))

api.get('auth', (err, req, res, next) => {
    res.status(200).send('Missing authentication credentials.');
});

api.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError')
        res.status(401).send('Missing authentication credentials.');
});


api.listen(config.server.port, err => {
    if (err) {
        logger.error(err);
        process.exit(1);
    }

    logger.info(
        `API is now running on port ${config.server.port} in ${config.server.env} mode \n
        Lancé le site web sur votre navigateur http://localhost:${config.server.port}`
    );
});