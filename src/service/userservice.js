const Users = require('../models/usermodel')

const Insert = async(data) =>{
    return await Users.query().insert(data);
}

const Findone = async(data) =>{
    return await Users.query().findOne(data);
}

const Update = async(data1,data2) =>{
    return await Users.query().findOne(data1).update(data2)
}

const findbyid = async(data)=>{
    return await Users.query().findById(data)
}

const findbyidupdate = async(data1,data2)=>{
    return await Users.query().findById(data1).update(data2)
}

const deleteByid = async(data)=>{
    return await Users.query().deleteById(data)
}

const Where = async(data) =>{
    return await Users.query().where(data);
}


module.exports = {Insert,Findone,Update,findbyid,findbyidupdate,deleteByid,Where}