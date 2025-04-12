'use client'

import React, { useState } from 'react'

import Box from '@mui/material/Box';
// import colors from '@/constants/colors';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import OuterRightSideNav from '@/components/OuterRightSideNav';


export default function NoAccount() {
	const [openRightNav, setOpenRightNav] = useState(false);

    return (
        <Box py={10}>
            <Stack flexDirection="column" alignItems="center" justifyItems="center" width="421px" m="auto">

                <Avatar 
                    // alt={fullName}
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
                >No account holder added</Typography>
                
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
                >
                    You're yet to add an account holder. 
                    Adding an account would give you access to 
                    adding various valuable assets for each holder
                </Typography>

                <Box my={3}
                    sx={{
                        bgcolor: "#19A752",
                        color: "#fff",
                        cursor: "pointer",
                        borderRadius: "14px",

                        padding: "17.5px 40px",
                        gap: "10px",
                        width: "247px",
                    }}
                    onClick={() => setOpenRightNav(true)}
                >
                    <Typography textAlign="center">Add an account holder</Typography>
                </Box>
            </Stack>

			<Drawer
				anchor="right"
				open={openRightNav}
				onClose={() => setOpenRightNav(false)}
			>
				<OuterRightSideNav
					closeNav={() => setOpenRightNav(false)}
				/>
			</Drawer>
        </Box>
    )
}
