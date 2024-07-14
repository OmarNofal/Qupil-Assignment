import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

export type Slot = {
    from: number
    to: number
}

export type Schedule = {
    friday: Array<Slot>
    saturday: Array<Slot>
    sunday: Array<Slot>
    monday: Array<Slot>
    tuesday: Array<Slot>
    wednesday: Array<Slot>
    thursday: Array<Slot>
}

export type ScheduleTableProps = {
    schedule: Schedule
}

const doW = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
]

export function ScheduleTable({ schedule }: ScheduleTableProps) {
    const tableRows = doW.map((day) => {
        const slots = schedule[day as keyof Schedule]
        return dayScheduleToTableRow(day, slots)
    })

    return (
        <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography fontWeight={600}>
                                Day of the Week
                            </Typography>
                        </TableCell>
                        <TableCell align='right'>
                            <Typography fontWeight={600}>Time Slots</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{tableRows}</TableBody>
            </Table>
        </TableContainer>
    )
}

function dayScheduleToTableRow(day: string, slots: Array<Slot>): JSX.Element {
    if (slots.length == 0) {
        return (
            <TableRow
                key={day}
                sx={{
                    '&:last-child td, &:last-child th': {
                        border: 0,
                    },
                }}
            >
                <TableCell component='th' scope='row'>
                    <Typography fontWeight={'medium'}>
                        {capitalize(day)}
                    </Typography>
                </TableCell>
                <TableCell align='right'>
                    <Typography fontWeight={'medium'}>Not Available</Typography>
                </TableCell>
            </TableRow>
        )
    }

    const slotsText = slotsToText(slots)

    return (
        <TableRow key={day}>
            <TableCell component='th' scope='row'>
                <Typography fontWeight={'medium'}>{capitalize(day)}</Typography>
            </TableCell>
            <TableCell align='right'>
                <Typography
                    fontWeight={'medium'}
                    style={{ whiteSpace: 'pre-line' }}
                >
                    {slotsText}
                </Typography>
            </TableCell>
        </TableRow>
    )
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.substring(1)
}

function slotsToText(slots: Array<Slot>): string {
    let slotsText = ''

    for (const slot of slots) {
        slotsText =
            slotsText +
            (slot.from.toString().padStart(2, '0') +
                ' - ' +
                slot.to.toString().padStart(2, '0'))
        if (slot != slots[slots.length - 1]) slotsText += '\n'
    }

    return slotsText
}
