'use client'

import React from 'react'

import Box from '@mui/material/Box';
// import colors from '@/constants/colors';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import OuterRightSideNav from '@/components/OuterRightSideNav';


interface accountData {
    id: string;
    image?: string;
    firstName: string;
    lastName: string;
    occupation: string;
    // createdAt: string;
    // updatedAt: string;
}

export default function AccountDetails({
    id, image, firstName, lastName, occupation, // createdAt, updatedAt
} : accountData) {
	const [openRightNav, setOpenRightNav] = useState(false);
    const name = firstName + " " + lastName;


    return (
        <Box>
            <Stack flexDirection="column" 
                alignItems="center" justifyItems="center" 
                width="300px" m="auto"
                sx={{
                    border: `1px solid #E4F4DC`
                }}
            >

                <Avatar 
                    alt={name}
                    src={image}
                    sx={{ 
                        bgcolor: "#E4F4DC",
                        border: "1.5px solid #E4F4DC",
                        width: "95px", height: "95px",
                        mb: 3
                    }}
                >
                    <AccountCircleOutlinedIcon sx={{ color: "#19A752", fontSize: "50px"}} />
                </Avatar>
                
                <Typography
                    sx={{
                        // fontFamily: "Libre Franklin",
                        fontWeight: "700",
                        fontSize: "20px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "#211F1F",
                    }}
                >{name}</Typography>
                
                <Typography
                    sx={{
                        // fontFamily: "Libre Franklin",
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "26px",
                        letterSpacing: "0%",
                        color: "#434343",
                        textAlign: "center"
                    }}
                >{occupation}</Typography>
            </Stack>

			<Drawer
				anchor="right"
				open={openRightNav}
				onClose={() => setOpenRightNav(false)}
			>
				<OuterRightSideNav
					closeNav={() => setOpenRightNav(false)}
                    id={id}
                    image={image}
                    firstName={firstName}
                    lastName={lastName}
                    occupation={occupation}
				/>
			</Drawer>
        </Box>
    )
}
