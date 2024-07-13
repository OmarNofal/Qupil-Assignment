import express from 'express'
import { inferSlotsFromText } from '../service/gemini-service'

const router = express.Router()

router.post(
    '/getScheduleFromNL',
    (req: express.Request, res: express.Response) => {
        const body = req.body

        const text = body.text

        if (!text) {
            return res.status(400).send('Text field missing')
        }

        inferSlotsFromText(text)
            .then((schedule) => {
                console.log(schedule)
                res.json(schedule)
            })
            .catch((err) => {
                console.error(`failed to return data: ${err}`)
                res.status(400).send('Text field missing')
            })
    },
)

export default router 
