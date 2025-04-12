// 'use client'
// import Image from "next/image";

import Box from '@mui/material/Box';
// import colors from '@/constants/colors';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Greeting from '@/components/Greeting';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import OuterRightSideNav from '@/components/OuterRightSideNav';
import prisma from '@/lib/prisma';
import NoAccount from '@/components/NoAccount';
import AccountTable from '@/components/AccountTable';
// import { revalidatePath } from 'next/cache';


export default async function Home() {
	// const [openRightNav, setOpenRightNav] = useState(false);
	// const accounts = await prisma.account.findMany();

	// console.log(accounts);
	

    return (
		<Box bgcolor="#F8F8F8">
			<Greeting firstName='Sunday' />

			<Box p="15px">
				<Box bgcolor="#fff" px="20px">
					<Stack flexDirection="row" alignItems="center"
						sx={{
							borderBottom: "1px solid #DDE6F0",
							// bgcolor: "red",
							height: "72px"
							// p: "24px",
						}}
					>
						<Typography
							sx={{
								// fontFamily: "Libre Franklin",
								fontWeight: "700",
								fontSize: "20px",
								lineHeight: "100%",
								letterSpacing: "0%"

							}}
						>Dashboard</Typography>
					</Stack>

					<AccountTable />

					{/* <Box>
						{
							accounts ?
								accounts.length ?

									
									<AccountTable 
									/>
								: <NoAccount />
							: <Typography>Loading...</Typography>
						}
					</Box> */}

				</Box>
			</Box>
		</Box>
    );
}
