const Wallets = require('../models/walletmoneymodel')

const Select = async(data) =>{
    return await Wallets.query().select(data);
}

const Where = async(data) =>{
    return await Wallets.query().where(data);
}

const Findone = async(data) =>{
    return await Wallets.query().findOne(data);
}

const Insert = async(data) =>{
    return await Wallets.query().insert(data);
}

const findbyidupdate = async(data1,data2)=>{
    return await Wallets.query().findById(data1).update(data2)
}

const deleteByid = async(data)=>{
    return await Wallets.query().deleteById(data)
}

module.exports = {Select,Where,Findone,Insert,findbyidupdate,deleteByid}
