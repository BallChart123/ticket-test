const Sequelize = require('sequelize');
const db = require('../util/database');

const Ticket = db.define('ticket', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: Sequelize.STRING(50),
    description: Sequelize.STRING(200),
    status: Sequelize.ENUM('pending', 'accepted', 'resolved', 'rejected'),
    contact_information: Sequelize.STRING,
    created_by: {
        type: Sequelize.STRING(50)
    },
    created_on: {
        type: Sequelize.DATE
    },
    updated_by: {
        type: Sequelize.STRING(50)
    },
    updated_on: {
        type: Sequelize.DATE
    }
});

module.exports = Ticket;
