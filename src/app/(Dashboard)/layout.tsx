// import Image from "next/image";

import Box from '@mui/material/Box';
// import colors from '@/constants/colors';
import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
import SideNav from "@/components/SideNav";
import Header from '@/components/Header';
import OuterRightSideNav from '@/components/OuterRightSideNav';
// import Greeting from '@/components/Greeting';


export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {



	return (
		<Box>
			<Stack flexDirection="row">
				<SideNav currentScreen="Dashboard" />

				<Box sx={{ flex: 1 }}>
					<Header fullName='Sunday Etom' />

					<Box>
						{children}
					</Box>
				</Box>

				{/* <OuterRightSideNav currentScreen="Dashboard" /> */}
			</Stack>

		</Box>
	);
}
