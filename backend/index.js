require("dotenv").config();

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const customersRoutes = require('./routes/customer')
const boxmenRoutes = require('./routes/boxman')
const errorHandler = require('./handlers/error')
const { loginRequired, ensureCorrectUser } = require("./middlewares/auth");

const server = require('http').createServer();
server.listen(8000);
const io = require('socket.io')(server)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
    '/api/auth', 
    authRoutes
)

app.use(
    '/api/customer/:id',
    loginRequired,
    ensureCorrectUser,
    customersRoutes
);

app.use(
    '/api/boxman/:id',
    loginRequired,
    ensureCorrectUser,
    boxmenRoutes
);

app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(port, function() {
    console.log(`server listening on port ${port}`)
})

// io.on('connect', (socket) => {
//     console.log('we did it')
//     socket.emit('event', {data: 'inside event'});
//     socket.on('client', data => {
//         console.log(data)
//     })
// });


//server receiving update every 3
io.on("connect", socket => {
    socket.on("updateLocation", async (data) => {
        console.log(data)
    });
    socket.on("other", () => {
        console.log('other')
    })
});