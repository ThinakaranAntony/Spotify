const Song = require('../models/songsmodel')

const addsong = async (req, res) => {
    try {
        let info = {
            songname: req.body.songname,
            moviename: req.body.moviename,
            music: req.body.music,
            lyrics: req.body.lyrics,
            singername: req.body.singername,
            songtype: req.body.songtype
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

module.exports = {
    addsong,
    updatesong,
    deletesong
}