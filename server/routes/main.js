const express = require('express');
const router = express.Router();

const priceListModel = require('../models/priceList.model');

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
