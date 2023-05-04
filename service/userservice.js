const User = require('../models/usermodel')
const nodemailer = require('nodemailer')
const otp = require('generate-password')
const bcrypt = require('bcrypt')

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
            password:hashpassword,
            email: req.body.email,
            role: req.body.role
        }
        const new_otp = otp.generate({
            length:4
        })
        const user = await User.query().insert(info)
        sendmail(req.body.email,new_otp)
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

        const user = await User.query().findById(id).patch(req.body)

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

module.exports = {
    addUser,
    getAllUsers,
    updateUser,
    deleteUser

}