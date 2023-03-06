const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const path = require('path')
const PORT = 3000
const db = require("./queries")

app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "../client")))
app.use(bodyParser.urlencoded({extended: true,}))

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../client", "index.html"))
})
app.get("/users", db.getUsers)
app.get("/users/:id", db.getUserById)
app.post("/users", db.addUsers)
app.put("/users/:id", db.updateUsers)
app.delete("/users/:id"/ db.deleteUser)

module.exports = app
