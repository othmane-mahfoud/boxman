require("dotenv").config();

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
const path = require('path')
const db = require('./models')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders')
const errorHandler = require('./handlers/error')
const { loginRequired, ensureCorrectUser } = require("./middlewares/auth");

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use(
    '/api/users/:id/orders',
    loginRequired,
    ensureCorrectUser,
    ordersRoutes
);

app.get('/api/orders', loginRequired, async function(req, res, next) {
    try {
        let orders = await db.Order.find()
        .sort({ createdAt: 'desc' })
        .populate("customer", {
            name: true,
            address: true,
            phoneNumber: true
        })
        return res.status(200).json(orders)
    } catch(err) {
        return(next(err))
    }
})

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
