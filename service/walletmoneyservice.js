const Walletmoney = require('../models/walletmoneymodel')
const adminaddingwalletmoney = async (req, res) => {
    try {
        let info = { Wallets: req.body.Wallets }
        const money = await Walletmoney.query().insert(info)
        res.status(200).send({ status: 200, message: "Fixed Amount Added", data: money })
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Fixed Amount Not Added", data: "" + err })
    }
}

const updatewalletmoney = async (req, res) => {
    try {
        let id = req.params.id

        const admin = await Walletmoney.query().findById(id).update(req.body)

        res.status(200).send({ status: 200, message: "Fixed Money Updated Successfully", data: admin })
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Fixed Money not Updated", data: "" + err })
    }
}

const deletemoney = async (req, res) => {
    try {
        let id = req.params.id

        await Walletmoney.query().deleteById(id)

        res.status(200).send({ status: 200, message: "Deleted Successfully" })
    }

    catch (err) {
        res.status(404).send({ status: 404, message: " Not Deleted" })
    }
}

module.exports = {
    adminaddingwalletmoney,
    updatewalletmoney,
    deletemoney
}