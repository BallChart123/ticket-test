const Sequelize = require('sequelize');
let sequelize;
if (process.env.LOCALBASE === 'DEV') {
    sequelize = new Sequelize(
        process.env.PGDATABASE,
        process.env.PGUSER,
        process.env.PGPASSWORD,
        {
            host: process.env.PGHOST,
            dialect: 'postgres'
        }
    );
} else {
    sequelize = new Sequelize('sqlite::memory:', {
        logging: false,
        dialectOptions: {
            useUTC: true,
            dateStrings: true,
            typeCast: true
        }
    });
}
module.exports = sequelize;
