
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const db = require('./models/')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));

app.get("/ping", (req, res) => {
    res.send("pong");
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})