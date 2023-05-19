const jwt = require('jsonwebtoken');
const users = require("../models/usermodel")
require('dotenv').config();
const authenticateToken = (req, res, next) => {

    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const userdb = await users.query().findOne('username', user.username)
        if (userdb == null) {
            return res.send("Not an User")
        }
        else {
            if (userdb.usertype == "Premium User") {
                req.body.user = user.username
                next();
            }
            else {
                if (userdb.role == "Artist") {
                    res.send("Sorry !!! You are an Artist, You are not accessible for playing other songs.")
                }
                else {
                    res.send("Not an Premium User")
                }
            }

        }
    })
}

const authenticateToken1 = (req, res, next) => {

    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const userdb = await users.query().findOne('username', user.username)
        if (userdb == null) {
            res.send("Not an User")
        }
        else {
            req.body.user = user.username
            next();
        }
    })
}

const authenticateToken2 = (req, res, next) => {

    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const userdb = await users.query().findOne('username', user.username)
        if (userdb == null) {
            res.send("Not an User")
        }
        else {
            if (userdb.role == "Artist") {
                req.art = user.username
                next();
            }
            else {
                res.send("You are not an Artist ")
            }

        }
    })
}

const authenticateToken3 = (req, res, next) => {

    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const userdb = await users.query().findOne('username', user.username)
        if (userdb == null) {
            return res.send("Not an User")
        }
        else {
            next();
        }
    })
}

const authenticateToken4 = (req, res, next) => {

    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const userdb = await users.query().findOne('username', user.username)
        if (userdb == null) {
            return res.send("Not an User")
        }
        else {

            if (userdb.role == "Admin") {
                req.body.user = user.username
                next();
            }
            else {
                res.send("You are not an Admin ")
            }
        }
    })
}

module.exports = {
    authenticateToken,
    authenticateToken1,
    authenticateToken2,
    authenticateToken3,
    authenticateToken4
} 