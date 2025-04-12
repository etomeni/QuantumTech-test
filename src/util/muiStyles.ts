import { SxProps, Theme } from "@mui/material/styles";

export const textInputMuiTextFieldStyle: SxProps<Theme> = {
    '& label.Mui-focused': {
        // color: 'var(--TextField-brandBorderFocusedColor)',
    },
    '& .MuiInputBase-input': { // Target input text
        color: "#211F1F",
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5,
        // bgcolor: {xs: "#2E2E2E", md: "#F1F1D6"},
        borderRadius: '12px',
        // padding: "15px",
    },

    '& .MuiInputBase-placeholder': { // Target placeholder text
        color: 'gray',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 1.5
    },
    '& .MuiOutlinedInput-root': {
        // bgcolor: darkTheme ? '#1C1B1F' : '#EFEFEF',
        borderRadius: '12px',
        // height: '42px',
        border: "1px solid #DDE6F0",
        // padding: "15px",
        '&.MuiInputBase-multiline': {
            padding: "0",
            '& .MuiInputBase-input': {
                padding: "15px",
            }
        },

        // '& fieldset': {
        //     // border: '1px solid #b9c1cd',
        //     border: 0,
        // },
        // '&:hover fieldset': {
        //     // border: '1px solid #434e5e',
        //     border: 0,
        // },
        // '&.Mui-focused fieldset': {
        //     // border: '1px solid #434e5e',
        //     border: 0,
        // },
    },

    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}

export const selectMuiStyle: SxProps<Theme> = {
    color: "#211F1F",
    borderRadius: "12px",
    // bgcolor: colors.primary,

    border: "1px solid #DDE6F0",

    // '.MuiOutlinedInput-notchedOutline': {
    //     borderColor: "#DDE6F0",
    // },
    // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    //     borderColor: '#DDE6F0',
    // },
    // '&:hover .MuiOutlinedInput-notchedOutline': {
    //     borderColor: '#DDE6F0',
    // },
    '.MuiSvgIcon-root ': {
        fill: "#211F1F",
    }
}