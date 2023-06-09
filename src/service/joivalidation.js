const Joi = require("joi")

const createUser = async (req, res, next) => {
    const CreateJoi = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
        role: Joi.string().required(),
        Verification: Joi.string()
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

const createAdmin = async (req, res, next) => {
    const CreateJoi = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
        role: Joi.string().required(),
        Verification: Joi.string()
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

const checkOtp = async (req, res, next) => {
    const CreateJoi = Joi.object({
        username: Joi.string().required(),
        Verification: Joi.string()
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

const updateUser = async (req, res, next) => {
    const CreateJoi = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

const deleteUser = async (req, res, next) => {
    const CreateJoi = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

const userWallet = async (req, res, next) => {
    const CreateJoi = Joi.object({
        wallet: Joi.number().required(),
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

const subscription = async (req, res, next) => {
    const CreateJoi = Joi.object({
        month: Joi.number().required(),
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

const login = async (req, res, next) => {
    const CreateJoi = Joi.object({
        username: Joi.string().required(),
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

const addSong = async (req, res, next) => {
    const CreateJoi = Joi.object({
        songname: Joi.string().required(),
        moviename: Joi.string().required(),
        music: Joi.string().required(),
        lyrics: Joi.string().required(),
        singername: Joi.string().required(),
        songtype: Joi.string().required(),
        Artist: Joi.string().required(),
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

const updateSong = async (req, res, next) => {
    const CreateJoi = Joi.object({
        songname: Joi.string().required(),
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

const userLike = async (req, res, next) => {
    const CreateJoi = Joi.object({
        Likes: Joi.number().required(),
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

const comments = async (req, res, next) => {
    const CreateJoi = Joi.object({
        comment: Joi.string().required(),
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

const wallets = async (req, res, next) => {
    const CreateJoi = Joi.object({
        Wallets: Joi.number().required(),
    })
    const validation = CreateJoi.validate(req.body);
    if (validation.error) {
        return res.status(400).send({ status: 400, message: "Validation Error" });
    }
    next();
}

module.exports = { createUser, createAdmin, checkOtp, updateUser, deleteUser, userWallet, subscription, login, addSong, updateSong, userLike, comments, wallets }