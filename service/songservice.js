const Song = require('../models/songsmodel')

const addsong = async (req, res) => {
    try {
        let info = {
            songname: req.body.songname,
            moviename: req.body.moviename,
            music: req.body.music,
            lyrics: req.body.lyrics,
            singername: req.body.singername,
            songtype: req.body.songtype,
            Artist:req.body.Artist
        }
        const song = await Song.query().insert(info)
        res.status(200).send({ status: 200, message: "Song Added", data: song })
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Song not Added", data: "" + err })
    }
}

const updatesong = async (req, res) => {
    try {
        let id = req.params.id
        const song = await Song.query().findById(id).update(req.body)

        res.status(200).send({ status: 200, message: "Song Details Updated Successfully", data: song })
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Song Details not Updated", data: "" + err })
    }
}


const deletesong = async (req, res) => {
    try {
        let id = req.params.id

        await Song.query().deleteById(id)

        res.status(200).send({ status: 200, message: "Song Deleted Successfully" })
    }

    catch (err) {
        res.status(404).send({ status: 404, message: "Song not Deleted" })
    }

}

const showpublicsongs = async (req,res) => {
    try {
        const npmsongs = await Song.query().where('songtype', 'public')

        res.status(200).send({ status: 200, message: "Showing Public Songs", data: npmsongs })
    }

    catch (err) {
        res.status(404).send({ status: 404, message: "Failed to show Public Songs",data: "" + err })
    }

}

const showpremiumsongs = async (req,res) => {
    try{
        const premsongs = await Song.query().where('songtype','Premium')

        res.status(200).send({ status: 200, message: "Showing Premium Songs", data: premsongs })
    }

    catch (err) {
        res.status(404).send({ status: 404, message: "Failed to show Premium Songs",data: "" + err })
    }
}

const artistsong = async (req,res) => {
    try{
        const art = await Song.query().where("Artist",req.body.user)

        res.status(200).send({ status: 200, message: "Showing Your Songs", data: art })
    }

    catch (err) {
        res.status(404).send({ status: 404, message: "Failed to show your songs",data: "" + err })
    }
}


module.exports = {
    addsong,
    updatesong,
    deletesong,
    showpublicsongs,
    showpremiumsongs,
    artistsong

}