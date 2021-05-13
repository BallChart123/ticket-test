const controller = require('../controllers/ticket');
const router = require('express').Router();

//CRUD Model-Agnostic.
//Keep them at the end of the route file for url parsing requests
router
    .get('/', async (req, res) => {
        try {
            const result = await controller.getAll();
            return res.status(200).json(result);
        } catch (error) {
            console.log('error :: ', error);
            return res.status(500).json(error);
        }
    })
    .get('/:id', async (req, res) => {
        try {
            const result = await controller.getOne(req);
            return res.status(200).json(result);
        } catch (error) {
            console.log('error :: ', error);
            return res.status(500).json(error);
        }
    })
    .post('/', async (req, res) => {
        try {
            const result = await controller.createOne(req);
            return res.status(200).json(result);
        } catch (error) {
            console.log('error :: ', error);
            return res.status(500).json(error);
        }
    })
    .put('/:id', async (req, res) => {
        try {
            const result = await controller.updateOne(req);
            return res.status(200).json(result);
        } catch (error) {
            console.log('error :: ', error);
            return res.status(500).json(error);
        }
    })
    .delete('/:id', async (req, res) => {
        try {
            const result = await controller.deleteOne(req);
            return res.status(200).json(result);
        } catch (error) {
            console.log('error :: ', error);
            return res.status(500).json(error);
        }
    });

module.exports = router;
