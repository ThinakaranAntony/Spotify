const Comment = require("../models/commentsmodel")

const Insert = async(data) =>{
    return await Comment.query().insert(data);
}

const Findone = async(data) =>{
    return await Comment.query().findOne(data);
}

module.exports = {Insert,Findone}