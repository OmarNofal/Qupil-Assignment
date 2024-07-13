import OpenAI from 'openai'

import 'dotenv/config'

import { GoogleGenerativeAI } from '@google/generative-ai'

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!!)

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction:
        'You will get pieces of text, and you will return timetable containing all days of the week with the available time slots as you understand from the input' +
        ' Your response should be (Day: timeslot in 24-hour format) nothing more and nothing less in valid json format without extras. The text will be from someone in Egypt. Make sure to take into consideration what their weekends are' +
        ' Dont put the json in a code block',
})

async function run() {
    const prompt =
        'I am available between noon and 4pm on weekends, after 7 pm to midnight on Monday and Wednesday, and after 9pm otherwise'

    const result = await model.generateContent({
        generationConfig: { temperature: 0.2 },
        contents: [{ role: 'user', parts: [{text: prompt}] }],
    })
    const response = await result.response
    const text = JSON.parse(response.text())
    console.log(text)
}

run()

export default undefined
