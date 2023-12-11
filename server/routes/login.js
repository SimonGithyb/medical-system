const { v4 } = require('uuid');
const express = require('express');
const router = express.Router();

const redisSvc = require('../svc/redis-svc');
const userModel = require('../models/user.model');
const personModel = require('../models/person.model');
const { SESSION_TIME_IN_M } = process.env;

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - login
 *         - password
 *       properties:
 *         login:
 *           type: string
 *           description: Login(username) for login to system 
 *         password:
 *           type: string
 *           description: Password for access to account
 *     Registration:
 *       type: object
 *       required:
 *         - login
 *         - password
 *         - name
 *         - surname
 *         - personalId
 *         - country
 *         - zipcode
 *         - address
 *         - phoneNumber
 *       properties:
 *         login:
 *           type: string
 *           description: Login(username) for login to system 
 *         password:
 *           type: string
 *           description: Password for access to account
 *         name:
 *           type: string
 *           description: Name persone who try to regist to system
 *         surname:
 *           type: string
 *           description: Surname persone who try to regist to system
 *         personalId:
 *           type: number
 *           description: Id persone whole try to regist to system
 *         country:
 *           type: string
 *           description: Country from this person is derived
 *         zipcode:
 *           type: number
 *           description: Zipcode where this persone life
 *         address:
 *           type: string
 *           description: Address where this persone life
 *         phoneNumber:
 *           type: number
 *           description: contact number for that person
 */

/**
 * @swagger
 * tags:
 *   name: Access control
 *   description: all endpoint for access control
 * /login:
 *   post:
 *     summary: Try login to system
 *     tags: [Access control]
 *     responses:
 *       200:
 *         description: Login to system
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *          description: Data don't found
 *          content:
 *              application/json:
 *                  schema:
 *                      type: string
 *   post/logout:
 *     summary: Try logout from system
 *     tags: [Access control]
 *     responses:
 *       200:
 *         description: Logout from system
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *          description: Can't found access token
 *          content:
 *              application/json:
 *                  schema:
 *                      type: string
 *   put:
 *    summary: Registration new patient to the system
 *    tags: [Access control]
 *    schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *    responses:
 *      200:
 *        description: New patient is registred
 *        content:
 *          application/json:
 *      400:
 *        description: Don't have all required data
 *      500:
 *        description: Some error happened
 */


router.post('/',
async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json('Dont exist require data');
    }

    const user = await userModel.find({login: login, password: password});

    if(user.length > 0) {
        const accessToken = v4();
        redisSvc.setAccessToken({
            username: login,
            accessToken
        });

        
        console.log(`Create login session with access token: ${accessToken}`);
        return res.status(200).send({
            username: login,
            accessToken: accessToken,
            role: user[0].role,
            time: SESSION_TIME_IN_M * 60
        });
    }
    return res.status(400).send({invalid: true});
});

router.post('/logout',
async (req, res) => {
    const { username, accessToken } = req.body;
    const foundedToken = await redisSvc.getAccessToken(username);

    if(foundedToken === undefined || foundedToken === null || accessToken !== foundedToken)
        return res.status(500).json('Can out found token');

    await redisSvc.dropAccessToken(accessToken);
    return res.status(200).json('Logout with succesfully');
});

router.put('/',
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

    const user = await userModel.findOne({login: login})[0];

    if (user) {
        return res.status(400).json('E-mail is in use');
    }

    try {
        const newUser = new userModel({
            login,
            password,
            personalId,
        });

        const newPerson = new personModel({
            name,
            surename,
            personalId,
            country,
            zipCode,
            address,
            phoneNumber
        })

        newUser.save();
        newPerson.save();
        console.log('Add new user with success!');
        res.status(200).json('Account has been created');
    } catch (err) {
        console.error('Cannot add user');
        res.status(500).json('Cannot add user');
    }
});

module.exports = router;
