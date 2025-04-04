
const express = require('express');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const app = express();
const port = 3000;
const db = require('./models/')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

db.sequelize.sync({

}).then(() => {
    console.log("Database ready");
})

//routers
const mainRouter = express.Router();
const adminRouter = express.Router();

require("./routes")(app, adminRouter, mainRouter);

app.use("/", mainRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})