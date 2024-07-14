import express from 'express'
import { inferSlotsFromText } from '../service/gemini-service'
import TutorModel from '../model/tutor'
import { ObjectId } from 'bson'

const router = express.Router()

router.get(
    `/getScheduleFromNL`,
    (req: express.Request, res: express.Response) => {
        const params = req.query
        const text = params.text as string

        console.log(params)

        if (!text) {
            return res.status(400).send('Text field missing')
        }

        inferSlotsFromText(text)
            .then((schedule) => {
                console.log(schedule)
                res.json(schedule)

                new TutorModel({
                    firstName: 'omar',
                    lastName: 'nofal',
                    slots: schedule,
                    country: 'egypt',
                }).save()
            })
            .catch((err) => {
                console.error(`failed to return data: ${err}`)
                res.status(400).send('Bad Query')
            })
    },
)

router.post(
    '/saveSchedule',
    async (req: express.Request, res: express.Response) => {
        const userId = '669244f055d591157e9e392d'

        console.log(req.body)
        const schedule = req.body.data

        await TutorModel.findByIdAndUpdate(new ObjectId(userId), {
            slots: schedule,
        })

        res.send('success')
    },
)

export default router
