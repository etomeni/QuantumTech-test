'use client'

import React, { useState } from 'react';
// import Image from "next/image";
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import apiClient, { apiErrorResponse } from '@/util/apiClient';
import { convertToBase64, defaultApiResponse } from '@/util/resources';
import { selectMuiStyle, textInputMuiTextFieldStyle } from '@/util/muiStyles';
import SnackbarToast, { SnackbarToastInterface } from './ToastNotification';


const formSchema = yup.object({
    firstName: yup.string().required().min(2).trim().label("First Name"),
    lastName: yup.string().required().min(2).trim().label("Last Name"),
    occupation: yup.string().required().min(2).trim().label("Occupation"),
});

interface _Props {
    id?: string;
    image?: string;
    firstName?: string;
    lastName?: string;
    occupation?: string;
    // createdAt: string;
    // updatedAt: string;

    closeNav: () => void,
}

const defaulToastNotification: SnackbarToastInterface = {
    status: "success",
    display: false,
    message: '',
}

export default function OuterRightSideNav({ 
    closeNav,
    id, image = '', firstName = '', lastName = "", occupation, // createdAt, updatedAt
}: _Props) {
    const [apiResponse, setApiResponse] = useState(defaultApiResponse);
    const [toastNotification, setToastNotification] = useState(defaulToastNotification);
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState(image ? image : '');
    const [inputImage, setInputImage] = useState<any>();

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg'],
            'image/webp': ['.webp'],
        },
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];

            setInputImage(file);
            const base64 = await convertToBase64(file);
            // console.log(base64.result);
            setPreviewImage(base64.result);
        },
    });

      
    const { 
        handleSubmit, register, reset, formState: { errors, isValid, isSubmitting } 
    } = useForm({ 
        resolver: yupResolver(formSchema),
        mode: 'onChange', 
        reValidateMode: 'onChange',
        defaultValues: {
            firstName, lastName, 
            occupation: occupation ? occupation : '0'
        }
    });

       
    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0]; 
        setInputImage(file);

        const base64 = await convertToBase64(file);
        // console.log(base64.result);
        setPreviewImage(base64.result);
    
        e.target.value = "";
    }
        
    const onSubmit = async (formData: typeof formSchema.__outputType) => {
        setApiResponse(defaultApiResponse);

        try {
            let response: any;

            if (id) {
                response = (await apiClient.put(`/accounts/${id}`,
                    {
                        ...formData,
                        ...(inputImage && { image: previewImage }),
                    }
                 )).data;
            } else {
                response = (await apiClient.post(`/accounts`, 
                    {
                        ...formData,
                        ...(inputImage && { image: previewImage }),
                    } 
                )).data;
            }
            // console.log(response);

            setToastNotification({
                display: true,
                status: "success",
                message: response.message
            });

            setTimeout(() => {
                router.refresh();
                window.location.reload();
            }, 1000);

            reset();
            closeNav();
            
        } catch (error: any) {
            console.log(error);
            const messageRes = apiErrorResponse(error, "Oooops, something went wrong. please try again.", true);

            setApiResponse({
                display: true,
                status: false,
                message: messageRes.message
            });

            setToastNotification({
                display: true,
                status: "error",
                message: messageRes.message
            });
        }
    }


    return (
        <Box
            sx={{
                // px: "15px",
                width: "481px",
                height: "100dvh",
                // bgcolor: "gray",
                display: "flex",
                flexDirection: "column",
                gap: "20",
                position: "sticky",
                top: 0,
                overflow: "scroll"
            }}
        >
            <Box
                sx={{
                    p: "20px",
                    borderBottom: "10px solid #F8F8F8"
                }}
            >
                <Box textAlign="right">
                    <IconButton size='small' onClick={() => closeNav()}>
                        <CloseIcon  sx={{ color: "#ADACAC", fontSize: "24px"}} />
                    </IconButton>
                </Box>

                <Typography
                    sx={{
                        // fontFamily: "Libre Franklin",
                        fontWeight: "700",
                        fontSize: "20px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        // mt: 1,
                    }}
                >{id ? "Edit" : "Add"} an account holder</Typography>

                <Typography
                    sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "#434343",
                        mt: 2,
                    }}
                >Fill the details below in order to {id ? "edit" : "add"} an account holder.</Typography>
            </Box>

            <Box
                sx={{
                    // p: "20px",
                    bgcolor: "#fff"
                }}
            >
                <Stack direction="column" p="20px"
                    alignItems='center' justifyContent="center" my={3}
                    onClick={() => document.getElementById("image")?.click()}
                    sx={{cursor: "pointer", width: "fit-content", mx: "auto"}}
                    {...getRootProps()}
                >
                    <input 
                        type="file" 
                        id='image' 
                        name="image" 
                        accept="image/jpeg, image/jpg, image/png, image/webp"
                        {...getInputProps()} 
                        onChange={handleFileUpload}
                        style={{display: "none"}}
                    />

                    <Box height="143px" width="143px"
                        sx={{
                            width: "143px",
                            height: "143px",
                            overflow: "hidden",
                            bgcolor: "#F8FFF4",
                            border: "1px dashed #19A752",
                            borderRadius: "50%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <img
                            // className="dark:invert"
                            src={previewImage ? previewImage : "/uploadIcon.png"} 
                            alt="account image"

                            style={{
                                maxWidth: "140px",
                                maxHeight: "140px",
                                objectFit: "fill",
                                margin: "auto"
                            }}
                        />
                    </Box>

                    <Typography
                        sx={{
                            // fontFamily: 'Libre Franklin',
                            // fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "14px",
                            lineHeight: "17px",
                            textDecorationLine: "underline",
                            color: "#19A752",
                            mt: 2.5,
                            cursor: "pointer"
                        }}
                    >Choose an image</Typography>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            // lineHeight: "17px",
                            color: "#211F1F",
                            mt: 1
                        }}
                    >or drag and drop the image here</Typography>
                </Stack>

                <Box my={3}>
                    <form noValidate onSubmit={ handleSubmit(onSubmit) }>
                        <Box p="20px" borderBottom="2px solid #F8F8F8">
                            <Box mb={2}>
                                <Typography variant="h4" component="h4"
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        color: "#211F1F",
                                        mb: 1
                                    }}
                                > First Name </Typography>

                                <TextField variant="outlined" fullWidth 
                                    inputMode="text" 
                                    type="text"
                                    defaultValue=""
                                    placeholder='Enter first name'
                                    error={ errors.firstName ? true : false }
                                    { ...register('firstName') }
                        
                                    sx={{
                                        ...textInputMuiTextFieldStyle,
                                    }}
                                />

                                <Box sx={{fontSize: 13, color: "red"}}>{ errors.firstName?.message}</Box>
                            </Box>

                            <Box mb={2}>
                                <Typography variant="h4" component="h4"
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        color: "#211F1F",
                                        mb: 1
                                    }}
                                > Last Name </Typography>

                                <TextField variant="outlined" fullWidth 
                                    inputMode="text" 
                                    type="text"
                                    defaultValue=""
                                    placeholder='Enter last name'
                                    error={ errors.lastName ? true : false }
                                    { ...register('lastName') }
                        
                                    sx={{
                                        ...textInputMuiTextFieldStyle,
                                    }}
                                />

                                <Box sx={{fontSize: 13, color: "red"}}>{ errors.lastName?.message}</Box>
                            </Box>

                            <Box>
                                <Typography variant="h4" component="h4"
                                    sx={{
                                        fontWeight: "400",
                                        fontSize: "14px",
                                        color: "#211F1F",
                                        mb: 1
                                    }}
                                > Occupation </Typography>

                                <FormControl fullWidth>
                                    <Select
                                        defaultValue={occupation ? occupation : "0"}
                                        // value={language}
                                        error={ errors.occupation ? true : false }

                                        sx={{
                                            ...selectMuiStyle
                                        }}
                                        
                                        { ...register('occupation') }

                                        // onChange={(event) => {
                                        //     const value: any = event.target.value;
                                        //     setLanguage(value);

                                        //     setValue(
                                        //         "language", 
                                        //         value, 
                                        //         {
                                        //             shouldDirty: true,
                                        //             shouldTouch: true,
                                        //             shouldValidate: true
                                        //         }
                                        //     );
                                        // }}
                                    >
                                        <MenuItem value="0" disabled>
                                            Select occupation
                                        </MenuItem>

                                        <MenuItem value="Nursing">
                                            Nursing
                                        </MenuItem>

                                        <MenuItem value="Engineering">
                                            Engineering
                                        </MenuItem>

                                        <MenuItem value="Accountanting">
                                            Accountanting
                                        </MenuItem>

                                        <MenuItem value="Marketing">
                                            Marketing
                                        </MenuItem>

                                        <MenuItem value="Physician">
                                            Physician
                                        </MenuItem>

                                    </Select>
                                </FormControl>

                                <Box sx={{fontSize: 13, color: "red", textAlign: "left"}}>{ errors.occupation?.message }</Box>
                            </Box>

                            {
                                apiResponse.display && (
                                    <Stack sx={{ width: '100%', mt: 5, mb: 2 }}>
                                        <Alert severity={apiResponse.status ? "success" : "error"}
                                            onClose={() => setApiResponse(defaultApiResponse)}
                                        >{apiResponse.message}</Alert>
                                    </Stack>
                                )
                            }
                        </Box>

                        <Box p="20px">
                            <Button variant="contained" 
                                fullWidth type="submit" 
                                disabled={ !isValid || isSubmitting } 
                                sx={{ 
                                    bgcolor: "#19A752",
                                    color: "#fff",
                                    mx: "auto",
                                    "&.Mui-disabled": {
                                        background: "#B8E0C8",
                                        color: "#FFFFFF"
                                    },
                                    "&:hover": {
                                        bgcolor: "#19A752"
                                    },
                                    "&:active": {
                                        bgcolor: "#19A752"
                                    },
                                    "&:focus": {
                                        bgcolor: "#19A752"
                                    },
                                    my: 2, 
                                    py: 1,
                                    borderRadius: "12px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    textTransform: "none"
                                }}
                            >
                                <span style={{ display: isSubmitting ? "none" : "initial" }}>Save</span>
                                <CircularProgress size={25} sx={{ display: isSubmitting ? "initial" : "none", color: "#fff", fontWeight: "bold" }} />
                            </Button>

                            <Box
                                sx={{
                                    height: "30px",
                                    border: "1px solid #DDE6F0",
                                    borderTop: 0,
                                    borderRadius: "0 0 12px 12px",
                                    mt:2
                                }}
                            > </Box>
                        </Box>

                    </form>
                </Box>

            </Box>
            

            <SnackbarToast 
                status={toastNotification.status} 
                display={toastNotification.display} 
                message={toastNotification.message} 
                closeSnackbar={() => setToastNotification(defaulToastNotification)}
            />

        </Box>
    )
}
