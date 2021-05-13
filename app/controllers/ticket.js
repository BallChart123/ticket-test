const Ticket = require('../models/ticket');
const VALID_STATUS = ['pending', 'accepted', 'resolved', 'rejected'];
/**
 * CRUD CONTROLLERS
 */

const buildResponse = (statusCode, body) => {
    const response = {
        statusCode,
        body
    };
    return response;
};
//CREATE-ONE
exports.createOne = async (req, res) => {
    console.log('createOne: [POST] /tickets/');
    try {
        const ticketObject = {
            name: req.body.name,
            description: req.body.description,
            status: VALID_STATUS.includes(req.body.status)
                ? req.body.status
                : 'pending',
            contact_information: req.body.information,
            created_by: req.body.name,
            created_on: Date.now(),
            updated_by: null,
            updated_on: null
        };
        const created = await Ticket.create(ticketObject);
        console.log('OK createOne Ticket: ', created);
        return buildResponse(200, created.dataValues);
    } catch (error) {
        console.log('ERROR in createOne ' + 'Ticket:', error);
        return buildResponse(500, error);
    }
};

//GET-ALL
exports.getAll = async (res) => {
    console.log('getAll: [GET] /ticket/');
    try {
        const getAllTicket = await Ticket.findAll();
        console.log(
            'OK getAll Ticket: ',
            getAllTicket.map((el) => el.dataValues)
        );
        return buildResponse(
            200,
            getAllTicket.map((el) => el.dataValues)
        );
    } catch (error) {
        console.log('ERROR in getAll ' + 'Ticket:', error);
        return buildResponse(500, error);
    }
};

//GET-ONE
exports.getOne = async (req, res, next) => {
    console.log('getOne: [GET] /ticket/:id');
    try {
        const getTicket = await Ticket.findByPk(req.params.id);
        console.log('OK getOne Ticket: ', getTicket.dataValues);
        return buildResponse(200, getTicket.dataValues);
    } catch (error) {
        console.log('ERROR in getOne ' + 'Ticket:', error);
        return buildResponse(500, error);
    }
};

//UPDATE-ONE.
exports.updateOne = async (req, res, next) => {
    console.log('updateOne: [PUT] /ticket/:id');
    try {
        const ticketObject = {
            name: req.body.name,
            description: req.body.description,
            status: VALID_STATUS.includes(req.body.status)
                ? req.body.status
                : 'accepted',
            contact_information: req.body.information,
            updated_by: req.body.name,
            updated_on: Date.now()
        };

        const updated = await Ticket.update(ticketObject, {
            where: { id: req.params.id }
        });
        console.log('OK updateOne Ticket: ', updated);
        const message = 'Update Success !';
        return buildResponse(200, message);
    } catch (error) {
        console.log('ERROR in updateOne ' + 'Ticket:', error);
        return buildResponse(500, error);
    }
};

//DELETE-ONE
exports.deleteOne = async (req, res, next) => {
    console.log('[DELETE] /ticket/:id');
    try {
        const deleted = await Ticket.destroy({ where: { id: req.params.id } });
        console.log('OK deleteOne Ticket: ', deleted);
        const message = 'Delete Success !';
        return buildResponse(200, message);
    } catch (error) {
        console.log('ERROR in deleteOne ' + 'Ticket:', error);
        return buildResponse(500, error);
    }
};
