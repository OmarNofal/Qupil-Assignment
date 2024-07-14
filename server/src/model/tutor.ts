import mongoose from 'mongoose'

export const TutorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: String,
    country: String,
    timezone: String,
    slots: {
        type: Map,
        of: [
            {
                from: Number,
                to: Number,
            },
        ],
        default: null,
        required: false,
    },
})

const TutorModel = mongoose.model('Tutors', TutorSchema)

export default TutorModel
