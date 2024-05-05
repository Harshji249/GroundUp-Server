const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const connectToMongo = require('./db')
const fileUpload = require('express-fileupload')

require('dotenv').config()

connectToMongo();
const app = express();
const port = process.env.PORT ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/auth-admin', require('./admin-routes/auth'))
app.use('/api/ground', require('./admin-routes/ground'))




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})