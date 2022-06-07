import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Alert, Snackbar } from '@mui/material'

const Message = ({ message, type = 'error' }) => {

    const [open, setOpen] = useState(true)

    return (
        ReactDOM.createPortal(
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={5000}
                onClose={() => setOpen(false)}
            >
                <Alert onClose={() => setOpen(false)} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>,
            document.getElementById('popup-message')
        )
    )
}

export default Message
