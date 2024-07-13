import express from 'express'
import path from 'path'
import connectToDatabase from './service/db'
import { Mongoose } from 'mongoose'

const app = express()
const PORT = 5000

app.use(express.static(path.join(__dirname, '../../frontend/build')))

app.get('/api', (req, res) => {
    res.send({ message: 'Hello from the server!' })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'))
})

function runServer(mongoose: Mongoose) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}
connectToDatabase(runServer, (err) => console.log(err))
