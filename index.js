const {
    response
} = require('express')
const express = require('express')
const {
    json
} = require('express/lib/response')

const app = express()

app.use(express.urlencoded())

app.get('/', (request, response) => {
    return response.json({
        success: true,
        message: "Backend is running well"
    })
})

const users = []

app.post('/register', (req, res) => {
    const data = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        birthdate: req.body.birthdate
    }
    users.push(data)
    return res.json({
        success: true,
        message: `Register Success`
    })
})

app.get('/users', (req, res) => {
    return res.json({
        success: true,
        message: 'List of Users',
        data: users
    })
})

app.patch('/users/:id', (req, res) => {
    const {id} = req.params
    const idx = users.findIndex(val => val.id === parseInt(id))
    users[idx].name = req.body.name
    users[idx].email = req.body.email
    users[idx].password = req.body.password
    users[idx].gender = req.body.gender
    users[idx].birthdate = req.body.birthdate

    return res.json({
        success: true,
        message: 'List of Users',
        data: users[idx]
    })
})

app.delete('/users/:id', (req, res) => {
    const {id} = req.params
    const idx = users.findIndex(val => val.id === parseInt(id))
    delete(users[idx])

    return res.json({
        success: true,
        message: `User with id ${id} is deleted`,
    })

    // users.forEach(val => {
    //     if (val.id !== parseInt(id)) {
    //         delete users[idx]
    //     }
    // })
})

app.listen(5000, () => {
    console.log('App running on port 5000')
})