const otp = require('generate-password');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/usermodel');
const walletMon = require('../models/walletmoneymodel');
const mail = require('../template/mail')
const userService = require('../service/userservice')
const walletservice = require('../service/walletmoneyservice')
let otp1;

const addUser = async (req, res) => {
    const hashpassword = bcrypt.hashSync(req.body.password, 8)
    try {
        let new_otp = otp.generate({
            length: 4,
            numbers: true,
            uppercase: false,
            lowercase: false
        });

        let info = {
            username: req.body.username,
            password: hashpassword,
            email: req.body.email,
            role: req.body.role,
            Verification: new_otp
        };

        if (info.role == "Admin") {
            return res.status(400).send({ status: 400, message: "Admin cannot be added", data: "" + err });
        };
        otp1 = new_otp;
        const user = await userService.Insert(info);
        mail.sendmail(req.body.email, new_otp);
        res.status(200).send({ status: 200, message: "User Created", data: user });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "User not Created", data: "" + err });
    }
};

const addAdmin = async (req, res) => {
    const hashpassword = bcrypt.hashSync(req.body.password, 8)
    try {
        var new_otp = otp.generate({
            length: 4,
            numbers: true,
            uppercase: false,
            lowercase: false
        });

        let info = {
            username: req.body.username,
            password: hashpassword,
            email: req.body.email,
            role: req.body.role,
            Verification: new_otp
        };
        if (info.role == "Admin") {
            info.usertype = "Premium User"
        };

        otp1 = new_otp;
        const user = await userService.Insert(info);
        mail.sendmail(req.body.email, new_otp)
        res.status(200).send({ status: 200, message: "Admin Added Successfully", data: user });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Admin not Added", data: "" + err });
    }
};

const checkOtp = async (req, res) => {
    try {
        let user = await userService.Findone({ Verification: req.body.Verification });
        if (user.Verification == req.body.Verification) {
            user.Verification = "Verified"
            const user1 = await userService.Update({ username: req.body.username }, user)
            if (!user1) {
                return res.status(400).send({ status: 400, message: "User not found" });
            }
            res.status(200).send({ status: 200, message: "Account Verifcation Successfull" });
        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Wrong OTP", data: "" + err });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const user1 = await userService.Findone("username", req.art)
        if (user1.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        let users = await User.query();
        res.status(200).send({ status: 200, message: "showing the results of data Fetched", data: users });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Fetched", data: "" + err });
    }
}

const updateUser = async (req, res) => {
    try {
        const user1 = await userService.Findone({ "username": req.art })
        if (user1.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }

        let id = req.params.id;
        if (req.body.email) {
            var new_otp = otp.generate({
                length: 4,
                numbers: true,
                uppercase: false,
                lowercase: false
            })
            mail.sendmail(req.body.email, new_otp)
            const user = await userService.findbyidupdate(id, req.body);
            otp1 = new_otp;
            res.status(200).send({ status: 200, message: "OTP Sended to Email", data: user });
        }
        else {
            const user = await userService.findbyidupdate(id, req.body);
            res.status(200).send({ status: 200, message: "Data Updated Successfully", data: user });
        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Updated", data: "" + err });
    }
};

const emailCheckOtp = async (req, res) => {
    try {
        if (otp1 == req.body.otp) {
            res.status(200).send({ status: 200, message: "Email Updated Succesfully" });
        } else {
            res.status(200).send({ status: 200, message: "Sorry !! Failed to update Email" });
        }
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Sorry !! Failed to update Email", data: "" + err });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user1 = await userService.Findone("username", req.art)
        if (user1.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        let id = req.params.id;
        await userService.deleteByid(id)
        res.status(200).send({ status: 200, message: "User Data Deleted Successfully" });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Deleted" });
    }
};

const subscriptionDetails = async (req, res) => {
    try {
        const user1 = await userService.Findone({ username: req.art })
        if (user1.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        const wall = await walletservice.Select("Wallets");
        let money = [];
        wall.map(n => money.push(n.Wallets))
        res.status(200).send({ status: 200, message: "Step 1: Fixed Amount :" + money + "Step 2:  Add a Fixed money to user wallet \n Step 3: Then Add a subscription for month wise by using a wallet money \n Step 4: Each Month costs 100rs" });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Failed to load Subscription Details", data: "" + err });
    }
}

const userWallet = async (req, res) => {
    try {
        const user2 = await userService.Findone({ username: req.art })
        if (user2.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        let id = req.params.id;
        const wallet = await walletservice.Where({ Wallets: req.body.wallet });
        if (wallet.length < 1) {
            return res.send("Only Fixed Amount can be added");
        }
        const user1 = await userService.findbyid(id);
        req.body.wallet = user1.wallet + req.body.wallet;
        const user = await userService.findbyidupdate(id, req.body);
        res.status(200).send({ status: 200, message: "Amount Added Successfully. Your wallet amount is " + req.body.wallet, data: user });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Amount not added", data: "" + err });
    }
}

const addSubscription = async (req, res) => {
    try {
        const user2 = await userService.Findone({ username: req.art })
        if (user2.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        let id = req.params.id;
        const user = await userService.findbyid(id);
        user.wallet = user.wallet - (Number(req.body.month) * 100);
        user.usertype = "Premium User";
        const user1 = await userService.findbyidupdate(id, user);
        res.status(200).send({ status: 200, message: "Subscription Added. Your remaining Wallet Amount is " + user.wallet, data: user1 });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Subscription Failure", data: "" + err });
    }
}

const adminNonPremiumUser = async (req, res) => {
    try {
        const user1 = await userService.Findone({ "username": req.art })
        if (user1.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        let user = await userService.Where({ usertype: 'Non Premium User' });
        res.status(200).send({ status: 200, message: "Showing Non Premium Users", data: user });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Fetched", data: "" + err });
    }
}

const adminPremiumUser = async (req, res) => {
    try {
        const user1 = await userService.Findone({ username: req.art })
        if (user1.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        let user = await userService.Where({ usertype: 'Premium User' });
        res.status(200).send({ status: 200, message: "Showing Premium Users", data: user });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Data not Fetched", data: "" + err });
    }
}

const login = async (req, res) => {
    const user1 = await userService.Findone({ username: req.body.username })
    if (user1.Verification != "Verified") {
        return res.status(400).send({ status: 400, message: " Your account is not verified " });
    }
    const username = req.body.username;
    const password = req.body.password;
    const user = { username: username, password: password };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
    res.json({ accessToken: accessToken });
}

module.exports = {
    addUser,
    getAllUsers,
    updateUser,
    deleteUser,
    login,
    userWallet,
    addSubscription,
    subscriptionDetails,
    adminNonPremiumUser,
    adminPremiumUser,
    checkOtp,
    emailCheckOtp,
    addAdmin
}