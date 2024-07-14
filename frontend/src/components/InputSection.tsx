import {
    Stack,
    Typography,
    Divider,
    TextField,
    Button,
    CircularProgress,
} from '@mui/material'

export type InputSectionProps = {
    text: string
    isVerifying: boolean
    onVerifyClicked: () => void
    setText: (text: string) => void
}

export function InputSection(props: InputSectionProps) {
    const loadingSpinner = props.isVerifying ? (
        <CircularProgress variant='indeterminate' color='warning' />
    ) : null
    return (
        <Stack
            direction={'column'}
            display={'flex'}
            flex='0.4'
            height={'auto'}
            padding={'16px 52px 128px 36px'}
            justifyContent={'center'}
            overflow={'hidden'}
        >
            <Typography fontWeight={900} fontSize={'2.5em'}>
                Describe your available slots
            </Typography>
            <Divider variant='fullWidth' />
            <TextField
                sx={{
                    marginTop: '48px',
                }}
                label='Describe your schedule.
                    
                    Ex: I am available between noon and 4pm on weekends, after 7 pm to midnight on
Monday and Wednesday, and after 9pm otherwise'
                variant='outlined'
                multiline={true}
                value={props.text}
                onChange={(event) => {
                    props.setText(event.target.value)
                }}
            />
            <div>
                <Button
                    variant='contained'
                    fullWidth={false}
                    sx={{ marginTop: '12px' }}
                    onClick={props.onVerifyClicked}
                >
                    {loadingSpinner}

                    <Typography fontWeight={'bold'} sx={{ marginLeft: '12px' }}>
                        VERIFY SCHEDULE
                    </Typography>
                </Button>
            </div>
        </Stack>
    )
}
