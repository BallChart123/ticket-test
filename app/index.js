const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database'); //database initializations
const Ticket = require('./models/ticket'); //REQUIRED even if IDE says not used!

//INITIALIZE APP WITH EXPRESS
const app = express();

//BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set proper Headers on Backend
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    next();
});

//ROUTES
app.use('/ticket', require('./routes/ticket')); //users crud

(async () => {
    if (process.env.LOCALBASE === 'DEV') {
        try {
            await sequelize.sync(
                { force: false } //Reset db every time
            );
            app.listen(process.env.EXTERNAL_PORT); //DEF in docker.compose.yml
        } catch (error) {
            console.log(error);
        }
    } else {
        app.listen(4000); //DEF in docker.compose.yml
    }
})();
