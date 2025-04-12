import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



interface _Props {
	firstName?: string
}

export default function Greeting({ firstName = "Nike" } : _Props) {
    return (
        <Stack flexDirection="row" alignItems="center" height="110px" px="20px" bgcolor="#fff">
            <Box>
                <Typography
                    sx={{
                        // fontFamily: "Libre Franklin",
                        fontWeight: "700",
                        fontSize: "22px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "#211F1F",
                        mb: 1.5
                    }}
                >Hi {firstName}</Typography>

                <Typography
                    sx={{
                        // fontFamily: "Libre Franklin",
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "#434343",
                    }}
                >Good morning, here is all the accounts added to date</Typography>
            </Box>
        </Stack>
    )
}
