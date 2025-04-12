import Box from '@mui/material/Box';
// import colors from '@/constants/colors';
import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
import SideNav from "@/components/SideNav";
import Header from '@/components/Header';


export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<Box>
			<Stack flexDirection="row">
				<Box>
					<SideNav />
				</Box>

				<Box sx={{ flexGrow: 1 }}>
					<Header fullName='Sunday Etom' />

					<Box>
						{children}
					</Box>
				</Box>
			</Stack>

		</Box>
	);
}
