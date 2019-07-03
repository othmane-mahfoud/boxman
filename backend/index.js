const express = require('express'),
      app = express(),
      port = process.env.PORT || 3001,
      cors = require('cors'),
      bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send('Hello')
})

app.listen(port, function() {
    console.log(`server listening on port ${port}`)
})