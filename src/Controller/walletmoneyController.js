const walletservice = require('../service/walletmoneyservice')
const userService = require('../service/userservice')

const adminAddingWalletMoney = async (req, res) => {
    try {
        const user1 = await userService.Findone({username:req.art})
        if(user1.Verification!="Verified"){
        return res.status(400).send({ status: 400, message:" Your account is not verified "});
        }
        let info = { Wallets: req.body.Wallets };
        const money = await walletservice.Insert(info);
        res.status(200).send({ status: 200, message: "Fixed Amount Added", data: money });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Fixed Amount Not Added", data: "" + err });
    }
}

const updateWalletMoney = async (req, res) => {
    try {
        const user1 = await userService.Findone("username",req.art)
        if(user1.Verification!="Verified"){
        return res.status(400).send({ status: 400, message:" Your account is not verified "});
        }
        let id = req.params.id;
        const admin = await walletservice.findbyidupdate(id,req.body);
        res.status(200).send({ status: 200, message: "Fixed Money Updated Successfully", data: admin });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Fixed Money not Updated", data: "" + err });
    }
}

const deleteMoney = async (req, res) => {
    try {
        const user1 = await userService.Findone("username",req.art)
        if(user1.Verification!="Verified"){
        return res.status(400).send({ status: 400, message:" Your account is not verified "});
        }
        let id = req.params.id;
        await walletservice.deleteByid(id);
        res.status(200).send({ status: 200, message: "Deleted Successfully" });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: " Not Deleted" });
    }
}

module.exports = {
    adminAddingWalletMoney,
    updateWalletMoney,
    deleteMoney
};