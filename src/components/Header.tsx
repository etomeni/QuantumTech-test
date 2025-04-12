import React from 'react';
// import Image from "next/image";

import Box from '@mui/material/Box';
// import colors from '@/constants/colors';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { stringAvatar, stringToColor } from '@/util/resources';
import Badge from '@mui/material/Badge';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';


interface _Props {
    fullName?: string
    badgeCount?: React.ReactNode
}

export default function Header({ fullName = "Nike Adesanoye", badgeCount = 2 }: _Props) {

    
    return (
        <Stack direction="row" alignItems='center' 
            justifyContent="end" height="80px" px="20px"
            borderBottom="1px solid #DDE6F0"
            sx={{
                position: "sticky",
                top: 0,
                bgcolor: "#fff"
            }}
        >
            <Box
                sx={{
                    borderRight: "1px solid #DDE6F0",
                    mr: 2
                }}
            >
                <Box px={2}>

                    <Badge badgeContent={badgeCount} max={99} color="error">
                        <Avatar
                            alt={fullName}
                            sx={{ 
                                bgcolor: "#F8F8F8",
                                border: "1px solid #DDE6F0",
                                width: "40px", height: "40px",
                                cursor: "pointer"
                            }}
                        >
                            <NotificationsOutlinedIcon sx={{ color: "#211F1F"}} />
                        </Avatar>
                    </Badge>
                </Box>
            </Box>

            <Stack flexDirection="row" alignItems="center" gap="5px">
                <Avatar
                    alt={fullName}
                    // src={userData.profile_image || ""}
                    sx={{ 
                        // boxShadow: "0px 4px 8px -1px rgba(0, 0, 0, 0.1)",
                        bgcolor: stringToColor(fullName),
                        width: "40px", height: "40px",
                    }}
                >
                    <Typography>{stringAvatar(fullName)}</Typography>
                </Avatar>

                <Typography
                    sx={{
                        // fontFamily: "Libre Franklin",
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "#211F1F",
                    }}
                >{fullName}</Typography>
            </Stack>
        </Stack>
    )
}
