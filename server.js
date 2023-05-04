var express = require('express');
const app = express();

app.use(express.json());


app.use(express.urlencoded({ extended: true }))

const router1 = require('./routes/userrouter')

app.use("/user", router1);

const PORT = process.env.DB_PORT || 8055

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})