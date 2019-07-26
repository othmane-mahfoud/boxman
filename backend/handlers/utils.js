const db = require('../models')
const axios = require('axios')

exports.updateBoxmanLocation = async function(server) {
    const io = require("socket.io")(server);
    io.on('connect', socket => {
        socket.on("updateBoxmanLocation", async ({id, location}) => {
            let boxman = await db.Boxman.findOneAndUpdate({ _id: id }, { $set: { currentLocation: location } }, {new: true})
            console.log(boxman.currentLocation)
        });
    })   
}

exports.geocodeLocation = function(location) {
    return new Promise((resolve, reject) => {
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(location)}&key=${process.env.GOOGLE_MAPS_KEY}`)
        .then(res => {
            return resolve(res.data.results[0].geometry.location)
        })
        .catch(err => {
            return reject(err.response.data.error)
        })
    })
}

exports.findNearestBoxman = async function(orderLocation) {
    try {
        const boxman = await db.Boxman.find(
            {
                currentLocation: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [orderLocation.lat, orderLocation.lng]
                        }
                    }
                }
            },
            { limit: 1 }
        )
        return boxman
    }
    catch(err) {
        return err
    }
}

exports.assignOrderToBoxman = (order) => {
    return new Promise((resolve, reject) => {
        const orderLocation = order.from
        exports.geocodeLocation(orderLocation)
        .then(location => {
            exports.findNearestBoxman(location)
            .then((res) => {
                return resolve(res[0]._id)
            })
        })
        .catch(err => {
            return reject(err)
        })
    })
}
