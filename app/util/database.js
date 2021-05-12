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
}
module.exports = sequelize;
