const express = require('express');
const app = express();
const router = require('./src/routes/routes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router.app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})