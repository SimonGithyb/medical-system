const express = require('express');
const router = express.Router();

const priceListModel = require('../models/priceList.model');
const reciptModel = require('../models/recipt.model');
const referralModel = require('../models/referral.model');
const personModel = require('../models/person.model');

/**
 * @swagger
 * tags:
 *   name: Main routers
 *   description: All routers from routers/main.js
 * /priceList:
 *   get:
 *     summary: get all pricelists from db 
 *     tags: [Main routers]
 *     responses:
 *       200:
 *         description: got price list successfuly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *          description: Data don't found
 *          content:
 *              application/json:
 *                  schema:
 *                      type: string
 */

router.get('/priceList',
async (req, res) => {
    try {
        res.status(200).send(await priceListModel.find());
    } catch (err) {
        console.error(error);
        return res.status(500).json('Cannot get data');
    }
});

router.put('/newRecipt',
async (req, res) => {
    try {
        const { personalId, drugs } = req.body;

        if (personalId === undefined
            || personalId === null
            || drugs.length <= 0)
                return res.status(400).json('Cannot save new recipt');

        const newRecipt = new reciptModel({
            personalId,
            drugs
        });

        newRecipt.save();
        console.log('Added new recipt to DB');
        return res.status(200).json('Added new recipt with succesfull!');
    } catch (err) {
        console.error(err);
        return res.status(500).json('Cannot save new recipt');
    }
});

router.put('/newReferral',
async (req, res) => {
    try {
        const { personalId, description } = req.body;

        if (personalId === undefined
            || personalId === null
            || description === undefined
            || description === null)
                return res.status(400).json('Cannot save new referral');

        const newReferral = new referralModel({
            personalId,
            description
        });

        newReferral.save();
        console.log('Added new referral to DB');
        return res.status(200).json('Added new referral with succesfull!');
    } catch (err) {
        console.error(err);
        return res.status(500).json('Cannot save new referral');
    }
});

router.get('/findPerson/:personalId',
async (req, res) => {
    try {
        const { personalId } = req.params;

        if (personalId === undefined
            || personalId === null)
                return res.status(400).json('Cannot found person');
            const pp = +personalId;
        const person = await personModel.findOne({ personalId });

        if (person === undefined
            || person === null)
                return res.status(200).json('Not exist person with this personal Id');
        else
            return res.status(200).send(person);
    } catch (err) {
        console.error(err);
        return res.status(500).json('Cannot save new referral');
    }
});


module.exports = router;
