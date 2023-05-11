var express = require('express');
const app = express();


app.use(express.json());


app.use(express.urlencoded({ extended: true }))

const router1 = require('./routes/userrouter')
const router2 = require('./routes/songsrouter')
const router3 = require('./routes/walletmoneyrouter')

app.use("/user", router1);
app.use("/song",router2);
app.use("/walletmoney",router3);

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})