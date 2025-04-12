'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
// import colors from '@/constants/colors';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import OuterRightSideNav from '@/components/OuterRightSideNav';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { defaultApiResponse, formatDate } from '@/util/resources';
import apiClient, { apiErrorResponse } from '@/util/apiClient';
import SnackbarToast, { SnackbarToastInterface } from './ToastNotification';
import NoAccount from './NoAccount';
import Loading from './Loading';


interface accountData {
    id: string;
    image?: string;
    firstName: string;
    lastName: string;
    occupation: string;
    createdAt: string;
    updatedAt: string;
}

interface _Props {
    // accounts: accountData[]
}


const defaulToastNotification: SnackbarToastInterface = {
    status: "success",
    display: false,
    message: '',
}

export default function AccountTable({
    // accounts
} : _Props) {
    const router = useRouter();
    
	const [openRightNav, setOpenRightNav] = useState(false);

    const [limitNo, setLimitNo] = useState(10);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    // const [isSubmitting, setIsSubmitting] = useState(false);

    // const [apiResponse, setApiResponse] = useState(defaultApiResponse);
    const [toastNotification, setToastNotification] = useState(defaulToastNotification);
    
    const [accounts, setAccounts] = useState<accountData[]>();
    const [selectedAccount, setSelectedAccount] = useState<accountData>();

    useEffect(() => {
        getAccounts();
    }, []);
    
    const getAccounts = async (pageNo: number = currentPageNo, limit: number = limitNo) => {

        try {
            const response = (await apiClient.get(`/accounts`,
                {
                    params: {
                        page: pageNo,
                        limit: limit,
                    }
                }
            )).data;
            // console.log(response);

            setAccounts(response.result.data);

            setLimitNo(response.result.meta.limit);
            setCurrentPageNo(response.result.meta.page);
            setTotalPages(response.result.meta.totalPages);
            setTotalRecords(response.result.meta.total);
    
        } catch (error: any) {
            const messageRes = apiErrorResponse(error, "Failed to load data. Please try again.");
            // console.log(messageRes);

            setToastNotification({
                display: true,
                status: "error",
                message: messageRes.message
            });
        }
    };
    
    const deleteAccount = async (id: string) => {

        try {
            const response = (await apiClient.delete(`/accounts/${id}`)).data;
            // console.log(response);

            setTimeout(() => {
                router.refresh();
                window.location.reload();
            }, 1000);


            setToastNotification({
                display: true,
                status: "success",
                message: response.message
            });
    
        } catch (error: any) {
            console.log(error);
            const messageRes = apiErrorResponse(error, "Failed to load data. Please try again.");
            // console.log(messageRes);
            
            setToastNotification({
                display: true,
                status: "error",
                message: messageRes.message
            });
        }
    };


    return (
        <Box>
            {
                accounts ? 
                    accounts.length ? 
                        <Box pt={3} pb={10}>
                            <TableContainer >
                                <Table aria-label="acount table">
                                    <TableHead sx={{bgcolor: '#F8F8F8'}}>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Account Image</TableCell>
                
                                            <TableCell>First Name</TableCell>
                
                                            <TableCell>Last Name</TableCell>
                
                                            <TableCell>Occupation</TableCell>
                
                                            <TableCell>Date</TableCell>
                
                                            <TableCell> </TableCell>
                                        </TableRow>
                                    </TableHead>
                
                                    <TableBody>
                                        {accounts.map((account, index) => (
                                            // <>
                                                <TableRow
                                                    key={account.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row"
                                                    >{ (limitNo * (currentPageNo - 1)) + (index + 1) }.</TableCell>
                
                                                    <TableCell>
                                                        <Avatar 
                                                            alt={account.firstName + ' ' + account.lastName}
                                                            src={account.image}
                                                            sx={{ 
                                                                bgcolor: "#c4c4c4",
                                                                // border: "1.5px solid #E4F4DC",
                                                                // width: "45px", height: "45px",
                                                                // mb: 3
                                                            }}
                                                            // children={<AccountCircleOutlinedIcon sx={{ color: "#19A752"}} />}
                                                        />
                                                    </TableCell>
                
                                                    <TableCell>{ account.firstName }</TableCell>
                                                    <TableCell>{ account.lastName }</TableCell>
                                                    <TableCell>{ account.occupation }</TableCell>
                                                    <TableCell>{ formatDate(account.createdAt) }</TableCell>

                                                    <TableCell>
                                                        <Stack flexDirection="row" alignItems="center" gap="15px">
                                                            <Button variant="outlined"
                                                                onClick={() => {
                                                                    setSelectedAccount(account);
                                                                    setOpenRightNav(true);
                                                                }}
                                                            >Edit</Button>

                                                            <Button variant="contained" color='error'
                                                                onClick={() => deleteAccount(account.id)}
                                                            >Delete</Button>
                                                        </Stack>
                                                    </TableCell>
                
                                                </TableRow>
                
                
                                            // </>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                component="div"
                                count={totalRecords} // totalRecords
                                rowsPerPage={limitNo}
                                page={currentPageNo -1}
                                onPageChange={(_e, page)=> {
                                    // console.log(page);
                
                                    const newPage = page + 1;
                                    console.log(newPage);
                                    
                                    getAccounts(newPage, limitNo);
                                }}
                                onRowsPerPageChange={(e) => {
                                    const value = e.target.value;
                                    // console.log(value);
                
                                    setLimitNo(Number(value));
                                    getAccounts(1, limitNo);
                                }}
                            />


                            <Box mt={3}
                                sx={{
                                    bgcolor: "#19A752",
                                    color: "#fff",
                                    cursor: "pointer",
                                    borderRadius: "14px",

                                    padding: "17.5px 40px",
                                    gap: "10px",
                                    width: "247px",
                                    mx: "auto"
                                }}
                                onClick={() => {
                                    setSelectedAccount(undefined);
                                    setOpenRightNav(true);
                                }}
                            >
                                <Typography textAlign="center">Add an account holder</Typography>
                            </Box>
                        </Box>
                    : <NoAccount />
                : <Loading />
            }



            <Drawer
                anchor="right"
                open={openRightNav}
                onClose={() => setOpenRightNav(false)}
            >
                <OuterRightSideNav
                    closeNav={() => setOpenRightNav(false)}
                    id={selectedAccount?.id}
                    image={selectedAccount?.image}
                    firstName={selectedAccount?.firstName}
                    lastName={selectedAccount?.lastName}
                    occupation={selectedAccount?.occupation}
                />
            </Drawer>

            <SnackbarToast 
                status={toastNotification.status} 
                display={toastNotification.display} 
                message={toastNotification.message} 
                closeSnackbar={() => setToastNotification(defaulToastNotification)}
            />

        </Box>
    )
}
