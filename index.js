
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const db = require('./models/')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// eslint-disable-next-line no-undef
app.use("/css", express.static(__dirname + "/css"));
// eslint-disable-next-line no-undef
app.use("/js", express.static(__dirname + "/js"));

app.get("/ping", (req, res) => {
    res.send("pong");
})

//routers
const mainRouter = express.Router();
const adminRouter = express.Router();

app.use("/", mainRouter);
app.use("/admin", adminRouter);

require("./controllers")(mainRouter, adminRouter, db);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})