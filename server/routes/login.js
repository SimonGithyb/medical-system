const { v4 } = require('uuid');
const express = require('express');
const router = express.Router();

const redisSvc = require('../svc/redis-svc');
const userModel = require('../models/user.model');
const { SESSION_TIME_IN_M } = process.env;

router.post('/',
async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json('Dont exist require data');
    }

    const user = await userModel.find({login: login, password: password});

    if(user) {
        const accessToken = v4();
        redisSvc.setAccessToken({
            username: login,
            accessToken
        });

        res.status(200).send({
            username: login,
            accessToken: accessToken,
            role: user[0].role,
            time: SESSION_TIME_IN_M * 60
        });
        console.log(`Create login session with access token: ${accessToken}`);
    }
});

router.post('/registration',
async (req, res) => {
    const { login, password, name, surename, personalId, country, zipCode, address, phoneNumber } = req.body;
    console.log(req.body);
    if (!login
        || !password
        || !name
        || !surename
        || !personalId
        || !country
        || !zipCode
        || !address
        || !phoneNumber
        ) {
        return res.status(400).json('Dont exist require data');
    }

    const user = await userModel.find({login: login});

    if (user) {
        return res.status(400).json('E-mail is in use');
    }

    try {
        const newUser = new userModel({
            login,
            password,
            name,
            surename,
            personalId,
            country,
            zipCode,
            address,
            phoneNumber
        });
        newUser.save();
        console.log('Add new user with success!');
        res.status(200).json('Account has been created');
    } catch (err) {
        console.error('Cannot add user');
        res.status(500).json('Cannot add user');
    }
});

module.exports = router;
