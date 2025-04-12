import React from 'react';
import Image from "next/image";
import Link from "next/link";

import Box from '@mui/material/Box';
// import colors from '@/constants/colors';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LogOut from './LogOut';



interface _Props {
    // children: React.ReactNode,
    // bottomSpacing?: number,
    // topSpacing?: boolean,
    currentScreen: string
}

export default function SideNav({ currentScreen = "Dashboard" }: _Props) {
    const sideNavItem = [
        {
            isActive: currentScreen == "Dashboard" ? true : false,
            title: "Dashboard",
            link: "/",
            icon: <HomeOutlinedIcon sx={{ fontSize: "18px" }} />,
        },
        {
            isActive: currentScreen == "Profile" ? true : false,
            title: "Profile",
            link: "/Profile",
            icon: <PersonOutlineOutlinedIcon sx={{ fontSize: "18px" }} />
        },
        {
            isActive: currentScreen == "Settings" ? true : false,
            title: "Settings",
            link: "/Settings",
            icon: <SettingsOutlinedIcon sx={{ fontSize: "18px" }} />
        },
    ];


    return (
        <Box
            sx={{
                px: "15px",
                width: "237px",
                height: "100dvh",
                // bgcolor: "gray",
                display: "flex",
                flexDirection: "column",
                gap: "20"
            }}
        >
            <Stack direction="row" alignItems='center' height="80px">
                <Image
                    // className="dark:invert"
                    src="/Logo.png"
                    alt="logo"
                    width={73}
                    height={19}
                    priority
                />
            </Stack>
            
            <Box my={"15px"}>
                {sideNavItem.map((nav, index) => (
                    <Link href={nav.link} key={index}>
                        <Stack direction="row" alignItems='center'  gap={"5px"}
                            sx={{
                                borderRadius: "14px",
                                padding: "16px",
                                mb: "5px",
                                bgcolor: nav.isActive ? "#19A752" : "",
                                color: nav.isActive ? "#fff" : '#434343',
                                ":hover": {
                                    bgcolor: nav.isActive ? "" : "#19A75210",
                                }
                            }}
                        >
                            { nav.icon }

                            <Typography
                                sx={{
                                    // fontFamily: "Libre Franklin",
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    lineHeight: "100%",
                                    letterSpacing: "0%"
                                }}				
                            >{nav.title}</Typography>
                        </Stack>
                    </Link>
                ))}
            </Box>

            <Box my="auto">
                <Typography mb={2}
                    sx={{
                        // fontFamily: "Libre Franklin",
                        fontWeight: "600",
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        // color: "#000"
                    }}				
                >Help & Support</Typography>

                <Link href="/FAQs">
                    <Stack direction="row" alignItems='center'  gap={"5px"}
                        sx={{
                            borderRadius: "14px",
                            padding: "16px",
                            mb: "5px",

                            bgcolor: currentScreen == "FAQs" ? "#19A752" : "",
                            color: currentScreen == "FAQs" ? "#fff" : '#434343',
                            ":hover": {
                                bgcolor: currentScreen == "FAQs" ? "" : "#19A75210",
                            }
                        }}
                    >
                        <QuestionMarkOutlinedIcon sx={{ color: "18px" }} />

                        <Typography
                            sx={{
                                // fontFamily: "Libre Franklin",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "100%",
                                letterSpacing: "0%"
                            }}				
                        >FAQs</Typography>
                    </Stack>
                </Link>

                <Link href="/ContactUs">
                    <Stack direction="row" alignItems='center'  gap={"5px"}
                        sx={{
                            borderRadius: "14px",
                            padding: "16px",
                            mb: "5px",

                            bgcolor: currentScreen == "Contact Us" ? "#19A752" : "",
                            color: currentScreen == "Contact Us" ? "#fff" : '#434343',
                            ":hover": {
                                bgcolor: currentScreen == "Contact Us" ? "" : "#19A75210",
                            }
                        }}
                    >
                        <EmailOutlinedIcon sx={{ color: "18px" }} />

                        <Typography
                            sx={{
                                // fontFamily: "Libre Franklin",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "100%",
                                letterSpacing: "0%"
                            }}				
                        >Contact Us</Typography>
                    </Stack>
                </Link>
            </Box>

            <Box my="auto">
                <LogOut />
            </Box>
        </Box>
    )
}
