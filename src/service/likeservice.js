const Like = require("../models/likemodel")

const Insert = async(data) =>{
    return await Like.query().insert(data);
}

const Findone = async(data) =>{
    return await Like.query().findOne(data);
}

module.exports = {Insert,Findone}

