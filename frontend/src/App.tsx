import React, { useState } from 'react'
import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { InputSection } from './components/InputSection'
import axios, { AxiosResponse } from 'axios'
import { ResultsSection, SavingStatus } from './components/ResultsSection'
import { Schedule } from './components/ScheduleTable'

async function fetchSchedule(
    text: string,
): Promise<AxiosResponse<any, any> | undefined> {
    console.log(text)

    try {
        const res = await axios.get(
            `/api/getScheduleFromNL?text=${encodeURIComponent(text)}`,
            {},
        )
        return res
    } catch (err) {
        console.log(err)
    }
}

async function saveSchedule(schedule: Schedule) {
    try {
        await axios.post('/api/saveSchedule', {
            data: schedule,
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}

function App() {
    const [text, setText] = useState('')

    const [schedule, setSchedule] = useState<Schedule | undefined>(undefined)

    const [savingStatus, setSavingStatus] = useState(SavingStatus.NONE)
    const [isVerifying, setIsVerifying] = useState(false)

    return (
        <Stack
            direction='row'
            width={'auto'}
            height={'100vh'}
            display={'flex'}
            overflow={'hidden'}
        >
            <InputSection
                text={text}
                isVerifying={isVerifying}
                onVerifyClicked={async () => {
                    setIsVerifying(true)
                    const response = await fetchSchedule(text)
                    if (response == undefined) return
                    else setSchedule(response.data)
                    setIsVerifying(false)
                }}
                setText={setText}
            />

            <ResultsSection
                schedule={schedule}
                savingStatus={savingStatus}
                onSaveSchedule={(schedule) => {
                    setSavingStatus(SavingStatus.SAVING)
                    saveSchedule(schedule)
                        .then(() => setSavingStatus(SavingStatus.SAVED))
                        .catch(() => setSavingStatus(SavingStatus.NONE))
                }}
            />
        </Stack>
    )
}

export default App
