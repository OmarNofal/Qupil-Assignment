import 'dotenv/config'
import fs from 'fs'
import { GoogleGenerativeAI } from '@google/generative-ai'

const instruction = fs
    .readFileSync('./src/service/system-instruction.txt')
    .toString('utf-8')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!!)

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: instruction,
})

export async function inferSlotsFromText(text: string) {
    const result = await model.generateContent({
        generationConfig: { temperature: 0.4 },
        contents: [{ role: 'user', parts: [{ text }] }],
    })

    console.log(await model.countTokens(text))
    console.log(await model.countTokens(instruction))

    const response = result.response

    const responseText = response.text()
    if (responseText.trim() === 'null') {
        // model didn't understand the query
        // user should retry with a different query
        throw new Error('Bad Query')
    }

    const scheduleJson = JSON.parse(response.text())
    console.log(scheduleJson)

    return scheduleJson
}
