const Ticket = require('../models/ticket');
const nowDate = Date.now();

/**
 * CRUD CONTROLLERS
 */

//CREATE-ONE
exports.createOne = async (req, res, next) => {
    console.log('createOne: [POST] /tickets/');
    try {
        const ticketObject = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            contact_information: req.body.information,
            created_by: req.body.name,
            created_on: Date.now(),
            updated_by: null,
            updated_on: null
        };

        try {
            const created = await Ticket.create(ticketObject);
            console.log('OK createOne Ticket: ', created);
            return res.status(201).json(created);
        } catch (error) {
            console.log('ERROR in createOne ' + 'Ticket:', error);
            return res.status(500).json(error);
        }
    } catch (error) {
        return res.status(400).json('Bad Request');
    }
};

//GET-ALL
exports.getAll = async (req, res, next) => {
    console.log('getAll: [GET] /ticket/');
    try {
        const getAllTicket = await Ticket.findAll();
        console.log(
            'OK getAll Ticket: ',
            getAllTicket.map((el) => el.dataValues)
        );
        return res.status(200).json(getAllTicket);
    } catch (error) {
        console.log('ERROR in getAll ' + 'Ticket:', error);
        return res.status(500).json(error);
    }
};

//GET-ONE
exports.getOne = async (req, res, next) => {
    console.log('getOne: [GET] /ticket/:id');
    try {
        const getTicket = await ticket.findByPk(req.params.id);
        console.log('OK getOne Ticket: ', getTicket.dataValues);
        return res.status(200).json(getTicket);
    } catch (error) {
        console.log('ERROR in getOne ' + 'Ticket:', error);
        return res.status(500).json(error);
    }
};

//UPDATE-ONE.
exports.updateOne = async (req, res, next) => {
    console.log('updateOne: [PUT] /ticket/:id');
    try {
        const ticketObject = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            contact_information: req.body.information,
            updated_by: req.body.name,
            updated_on: Date.now()
        };

        try {
            const updated = await Ticket.update(ticketObject, {
                where: { id: req.params.id }
            });
            console.log('OK updateOne Ticket: ', updated);
            return res.status(200).json(updated);
        } catch (error) {
            console.log('ERROR in updateOne ' + 'Ticket:', error);
            return res.status(500).json(error);
        }
    } catch (error) {
        return res.status(400).json('Bad Request');
    }
};

//DELETE-ONE
exports.deleteOne = async (req, res, next) => {
    console.log('[DELETE] /ticket/:id');
    try {
        const deleted = await Ticket.destroy({ where: { id: req.params.id } });
        console.log('OK deleteOne Ticket: ', deleted);
        return res.status(200).json(deleted);
    } catch (error) {
        console.log('ERROR in deleteOne ' + 'Ticket:', error);
        return res.status(500).json(error);
    }
};
