require("dotenv").config();

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const errorHandler = require('./handlers/error')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)

app.get('/', function(req, res) {
    res.send('Hello')
})

app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(port, function() {
    console.log(`server listening on port ${port}`)
})
