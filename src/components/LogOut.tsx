'use client'

import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SnackbarToast, { SnackbarToastInterface } from './ToastNotification'


const defaulToastNotification: SnackbarToastInterface = {
    status: "success",
    display: false,
    message: '',
}

export default function LogOut() {
        const [toastNotification, setToastNotification] = useState(defaulToastNotification);
        
    return (
        <>
            <Stack direction="row" alignItems='center'  gap={"5px"}
                onClick={() => setToastNotification({display: true, message: "Log out successful", status: "success"})}
                sx={{
                    borderRadius: "14px",
                    padding: "16px",
                    color: "#BF0202",
                    mb: "5px",
                    cursor: "pointer"
                }}
            >
                <LogoutOutlinedIcon sx={{ color: "18px" }} />

                <Typography
                    sx={{
                        // fontFamily: "Libre Franklin",
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%"
                    }}				
                >Log out</Typography>
            </Stack>

            <SnackbarToast 
                status={toastNotification.status} 
                display={toastNotification.display} 
                message={toastNotification.message} 
                closeSnackbar={() => setToastNotification(defaulToastNotification)}
            />
        </>
    )
}
