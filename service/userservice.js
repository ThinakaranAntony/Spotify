const User = require('../models/usermodel')
const nodemailer = require('nodemailer')
const otp = require('generate-password')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const walletmon = require('../models/walletmoneymodel')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thinaat282@gmail.com',
        pass: 'ncuhzozzivvmtwws'
    }
});



function sendmail(tomail, otp) {
    const mailoptions = {
        from: 'thinaat282@gmail.com',
        to: tomail,
        subject: 'Account Verification',
        text: `Your OTP for Account Verification : ${otp}`
    };

    transporter.sendMail(mailoptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Mail Sent: ' + info.response);
        }
    })
}

const addUser = async (req, res) => {
    const hashpassword = await bcrypt.hash(req.body.password, 8)
    try {
        let info = {
            username: req.body.username,
            password: hashpassword,
            email: req.body.email,
            role: req.body.role
        }
        const new_otp = otp.generate({
            length: 4
        })
        const user = await User.query().insert(info)
        sendmail(req.body.email, new_otp)
        res.status(200).send({ status: 200, message: "User Created", data: user })
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "User not Created", data: "" + err })
    }
}

const getAllUsers = async (req, res) => {
    try {
        let users = await User.query()
        res.status(200).send({ status: 200, message: "showing the results of data Fetched", data: users })
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Fetched", data: "" + err })
    }

}

const updateUser = async (req, res) => {
    try {
        let id = req.params.id

        const user = await User.query().findById(id).update(req.body)

        res.status(200).send({ status: 200, message: "User Data Updated Successfully", data: user })
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Updated", data: "" + err })
    }
}


const deleteUser = async (req, res) => {
    try {
        let id = req.params.id

        await User.query().deleteById(id)

        res.status(200).send({ status: 200, message: "User Data Deleted Successfully" })
    }

    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Deleted" })
    }

}

const userwallet = async (req, res) => {
    try {
        let id = req.params.id
        const wallet = await walletmon.query().where('Wallets',req.body.wallet)
        console.log(wallet)
if (wallet.length <1 ){
return res.send ("Amount should be on " )
}
        const user = await User.query().findById(id).update(req.body)
        res.status(200).send({ status: 200, message: "Amount Added Successfully. Your wallet amount is " + req.body.wallet, data: user })
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Amount not added", data: "" + err })
    }
}

const addsubscription = async (req, res) => {
    try {
        let id = req.params.id
        const user = await User.query().findById(id)
        user.wallet = user.wallet - (Number(req.body.month) * 100)
        user.usertype = "Premium User"
        const user1 = await User.query().findById(id).update(user)
        res.status(200).send({ status: 200, message: "Subscription Added. Your remaining Wallet Amount is " + user.wallet, data: user1 })
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Subscription Failure", data: "" + err })
    }
}


const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = { username: username, password: password };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
    res.json({ accessToken: accessToken })
}

module.exports = {
    addUser,
    getAllUsers,
    updateUser,
    deleteUser,
    login,
    userwallet,
    addsubscription

}