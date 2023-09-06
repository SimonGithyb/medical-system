const express = require('express');
const router = express.Router();

const priceListModel = require('../models/priceList.model');

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

module.exports = router;
