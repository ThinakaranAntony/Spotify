const Song = require('../models/songsmodel');
const comm = require('../models/commentsmodel');
const Like = require('../models/likemodel');
const Users = require('../models/usermodel');
const songService = require('../service/songservice')
const likeService = require('../service/likeservice')
const userService = require('../service/userservice')
const commentService = require('../service/commentservice')

const addSong = async (req, res) => {
    try {
        let info = {
            songname: req.body.songname,
            moviename: req.body.moviename,
            music: req.body.music,
            lyrics: req.body.lyrics,
            singername: req.body.singername,
            songtype: req.body.songtype,
            Artist: req.body.Artist
        }
        const user = await userService.Findone({ username: req.art })
        if (user.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        const song = await songService.Insert(info);
        res.status(200).send({ status: 200, message: "Song Added", data: song });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Song not Added", data: "" + err });
    }
}

const updateSong = async (req, res) => {
    try {
        const user = await userService.Findone({"username":req.art})
        if (user.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        let id = req.params.id;
        const song = await songService.findbyidupdate(id, req.body);
        res.status(200).send({ status: 200, message: "Song Details Updated Successfully", data: song });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Song Details not Updated", data: "" + err });
    }
}


const deleteSong = async (req, res) => {
    try {
        const user = await userService.Findone({"username":req.art})
        if (user.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        let id = req.params.id;
        await songService.deleteByid(id);
        res.status(200).send({ status: 200, message: "Song Deleted Successfully" });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Song not Deleted" });
    }
}

const showPublicSongs = async (req, res) => {
    try {
        const user = await userService.Findone({ username: req.art })
        if (user.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        const npmsongs = await songService.Where({ songtype: 'public' });
        res.status(200).send({ status: 200, message: "Showing Public Songs", data: npmsongs });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Failed to show Public Songs", data: "" + err });
    }
}

const showPremiumSongs = async (req, res) => {
    try {
        const user = await userService.Findone({ username: req.art })
        if (user.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        const premsongs = await songService.Where({ songtype: 'Premium' });
        res.status(200).send({ status: 200, message: "Showing Premium Songs", data: premsongs });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Failed to show Premium Songs", data: "" + err });
    }
}

const artistSong = async (req, res) => {
    try {
        const user = await userService.Findone({ username: req.art })
        if (user.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        const art = await songService.Where({ "Artist": req.body.Artist });
        res.status(200).send({ status: 200, message: "Showing Your Songs", data: art });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Failed to show your songs", data: "" + err });
    }
}

const userLike = async (req, res) => {
    try {
        const user = await userService.Findone({ username: req.art })
        if (user.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        let id = req.params.id;
        const like1 = await songService.findbyid(id);
        const likes = await likeService.Findone({ 'songid': req.params.id, 'userid': req.userid });
        if (likes) {
            return res.status(200).send({ status: 200, message: "You have already liked this song", data: null });
        }
        data = { songid: Number(req.params.id), userid: req.userid };
        const like2 = await likeService.Insert(data);
        req.body.Likes = like1.Likes + req.body.Likes;
        const like = await songService.findbyidupdate(id, req.body);
        res.status(200).send({ status: 200, message: "Liked", data: like });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Failed to Like song", data: "" + err });
    }
}

const comments = async (req, res) => {
    try {
        const user = await userService.Findone("username", req.art)
        if (user.Verification != "Verified") {
            return res.status(400).send({ status: 400, message: " Your account is not verified " });
        }
        const add = { comment: req.body.comment, Songid: req.params.id };
        let id = req.params.id;
        const usercomment = await commentService.Insert(add);
        res.status(200).send({ status: 200, message: "Comment Added", data: usercomment });
    }
    catch (err) {
        res.status(400).send({ status: 400, message: "Comment not Added", data: "" + err });
    }
}

module.exports = {
    addSong,
    updateSong,
    deleteSong,
    showPublicSongs,
    showPremiumSongs,
    artistSong,
    userLike,
    comments

}