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

exports.getDistance = function(origin, destination) {
    return new Promise((resolve, reject) => {
        return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURI(origin)}&destinations=${encodeURI(destination)}&departure_time=now&key=${process.env.GOOGLE_MAPS_KEY}`)
        .then(res => {
            // console.log(res.data.rows[0].elements[0].distance.value)
            return resolve(res.data.rows[0].elements[0].distance.value)
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

exports.dijkstra = (start, end) => {
    let points = [];
    points[0] = [0, 2, 3, 1]
    points[1] = [2, 0, 0, 1]
    points[2] = [3, 0, 0, 1]
    points[3] = [1, 1, 1, 0]
    let visited = []
    visited[0] = false
    visited[1] = false
    visited[2] = false
    visited[3] = false
    let dijkstraTable = [
        { shortestDistance: Number.POSITIVE_INFINITY, previousVertex: start},
        { shortestDistance: Number.POSITIVE_INFINITY, previousVertex: start},
        { shortestDistance: Number.POSITIVE_INFINITY, previousVertex: start},
        { shortestDistance: Number.POSITIVE_INFINITY, previousVertex: start},
    ]
    visited [start] = true
    dijkstraTable[start].shortestDistance = 0
    let currentNode = start
    for(let index = 0; index < points.length; index++) {
        for(let i = 0; i < dijkstraTable.length; i++) {
            if (points[currentNode][i] + dijkstraTable[currentNode].shortestDistance < dijkstraTable[i].shortestDistance) {
                dijkstraTable[i].shortestDistance = points[currentNode][i] + dijkstraTable[currentNode].shortestDistance
                dijkstraTable[i].previousVertex = currentNode
            }
        }
        let min = Number.POSITIVE_INFINITY
        var minIndex
        visited[currentNode] = true
        for(let j = 0; j < dijkstraTable.length; j++) {
            if(dijkstraTable[j].shortestDistance < min && !visited[j]){
                min = dijkstraTable[j].shortestDistance
                minIndex = j
            }
        }
        currentNode = minIndex
    }
    console.log(dijkstraTable)
    let current = end
    while(true) {
        console.log(current)
        current = dijkstraTable[current].previousVertex
        if(current === start) {
            console.log(current)
            break
        }
    }
}

exports.dijkstraWithValues = async (start, points) => {
    let indexToLocationMap = [start, ...points]
    distanceMatrix = await Promise.all(indexToLocationMap.map(origin => Promise.all(indexToLocationMap.map(destination => exports.getDistance(origin, destination)))))
    visited = [true]
    let dijkstraTable = [{ location: start, shortestDistance: 0, previousVertex: 0 }]
    for(let k = 0; k < points.length; k++){
        visited.push(false)
        dijkstraTable.push({ location: points[k], shortestDistance: Number.POSITIVE_INFINITY, previousVertex: 0 })
    }
    let currentNode = 0
    for(let index = 0; index < distanceMatrix.length; index++) {
        for(let i = 0; i < dijkstraTable.length; i++) {
            if (distanceMatrix[currentNode][i] + dijkstraTable[currentNode].shortestDistance < dijkstraTable[i].shortestDistance) {
                dijkstraTable[i].shortestDistance = distanceMatrix[currentNode][i] + dijkstraTable[currentNode].shortestDistance
                dijkstraTable[i].previousVertex = currentNode
            }
        }
        let min = Number.POSITIVE_INFINITY
        var minIndex
        visited[currentNode] = true
        for(let j = 0; j < dijkstraTable.length; j++) {
            if(dijkstraTable[j].shortestDistance < min && !visited[j]){
                min = dijkstraTable[j].shortestDistance
                minIndex = j
            }
        }
        currentNode = minIndex
    }
    dijkstraTable.sort(function(a, b){
        return a.shortestDistance - b.shortestDistance;
    });
    console.log(dijkstraTable)
    let waypoints = dijkstraTable.map(d => d.location)
    waypoints.shift()
    return waypoints
    // console.log(waypoints)
}
