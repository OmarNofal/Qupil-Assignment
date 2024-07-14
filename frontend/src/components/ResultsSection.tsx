import { Typography, Stack, Button, CircularProgress } from '@mui/material'
import { Schedule, ScheduleTable } from './ScheduleTable'

export enum SavingStatus {
    NONE,
    SAVING,
    SAVED,
}

export type ResultsSectionProps = {
    schedule?: Schedule
    savingStatus: SavingStatus
    onSaveSchedule: (schedule: Schedule) => void
}

export function ResultsSection(props: ResultsSectionProps) {
    const schedule = props.schedule

    if (!schedule) {
        return <></>
    }

    const savingStatusText =
        props.savingStatus == SavingStatus.SAVING
            ? 'Saving...'
            : props.savingStatus == SavingStatus.SAVED
            ? 'Saved. ✔'
            : ''

    return (
        <Stack
            direction='column'
            justifyContent={'center'}
            flex='0.6'
            alignItems={'center'}
            padding={'24px'}
        >
            <Typography
                fontWeight={900}
                fontSize={'1.4em'}
                sx={{ alignSelf: 'flex-start', marginBottom: '12px' }}
            >
                Is this your intended schedule?
            </Typography>
            <ScheduleTable schedule={schedule} />

            <Button
                variant='contained'
                sx={{
                    alignSelf: 'flex-start',
                    marginTop: '12px',
                    marginBottom: '12px',
                }}
                onClick={() => props.onSaveSchedule(schedule)}
            >
                Save Schedule
            </Button>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                }}
            >
                <Typography>{savingStatusText}</Typography>
                {props.savingStatus == SavingStatus.SAVING && (
                    <CircularProgress
                        variant='indeterminate'
                        sx={{ marginLeft: '12px' }}
                    ></CircularProgress>
                )}
            </div>
        </Stack>
    )
}
