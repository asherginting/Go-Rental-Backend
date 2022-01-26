const express = require('express')

const app = express()

app.use(express.urlencoded({
  extended: true
}))

app.use(require('./src/routes'))

app.listen(5000, () => {
  console.log('App Listening on port 5000')
})