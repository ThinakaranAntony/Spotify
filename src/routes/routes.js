const express = require('express');
const app = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router1 = require('./userrouter');
const router2 = require('./songsrouter');
const router3 = require('./walletmoneyrouter');

app.use("/api/v1/user", router1);
app.use("/api/v1/song", router2);
app.use("/api/v1/walletmoney", router3);

module.exports = { app };