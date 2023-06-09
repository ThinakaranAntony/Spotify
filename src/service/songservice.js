const Songs = require('../models/songsmodel');

const Findone = async (data) => {
    return await Songs.query().findOne(data);
}

const Insert = async (data) => {
    return await Songs.query().insert(data);
}

const findbyid = async(data)=>{
    return await Songs.query().findById(data)
}

const findbyidupdate = async (data1, data2) => {
    return await Songs.query().findById(data1).update(data2)
}

const deleteByid = async (data) => {
    return await Songs.query().deleteById(data)
}

const Where = async (data) => {
    return await Songs.query().where(data);
}

module.exports = { Findone, Insert, findbyid, findbyidupdate, deleteByid, Where }