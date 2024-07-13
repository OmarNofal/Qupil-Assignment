import express from 'express'
import path from 'path'
import connectToDatabase from './service/db'
import { Mongoose } from 'mongoose'
import scheduleRoutes from './controller/schedule-routes'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../../frontend/build')))

app.use('/api', scheduleRoutes)

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
