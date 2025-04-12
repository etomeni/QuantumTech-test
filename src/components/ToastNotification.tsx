// import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
// import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography } from '@mui/material';


export type SnackbarToastInterface = {
    // status: "error" | "info" | "success" | "warning";
    status: "error" | "success";
    display: boolean;
    position?: {
        vertical: "top" | "bottom",
        horizontal: "left" | "center" | "right",
    };
    duration?: number;
    message: string;
    closeSnackbar?: () => void;
};

const SnackbarToast: React.FC<SnackbarToastInterface> = ({
    message, display, status, duration = 3000, closeSnackbar = () => {}, 
    position = {vertical: "top", horizontal: "right"}
}) => {

    const snackbarAction = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => closeSnackbar()}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
    
    return (
        <Snackbar
            anchorOrigin={position}
            open={display}
            autoHideDuration={duration}
            onClose={() => closeSnackbar()}
            message={message}
            action={snackbarAction}
        >
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between"
                sx={{
                    gap: "10px",
                    padding: "14px",
                    background: `${status == "success" ? "#F8FFF4" : "#FFF1F1"}`,
                    border: `1px solid ${status == "success" ? '#329902' : "#DF0000"}`,
                    borderRadius: "14px",
                }}      
            >
                { status == "success" 
                    ? <CheckCircleIcon sx={{ color: "#329902"}} /> 
                    : <CancelIcon sx={{ color: "#DF0000"}} /> 
                }

                <Typography
                    sx={{
                        color: "#211F1F",
                        fontWeight: "400",
                        fontSize: "14px",
                        flexGrow: 1
                    }}
                >{ message }</Typography>

                <CloseIcon sx={{ color: "#434343" }} 
                    onClick={() => closeSnackbar()}
                />
            </Stack>
        </Snackbar>
    )
}

export default SnackbarToast;