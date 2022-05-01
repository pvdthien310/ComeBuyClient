import * as React from 'react';

import Box from '@mui/material/Box';
import { useState, useEffect } from 'react'
import branchApi from '../../api/branchAPI';
import { SnackBarAlert, StockInBranch } from '../../components';
import {StyledTab, StyledTabs, TabPanel} from './child'


// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     {children}
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };


// const StyledTabs = styled((props) => (
//     <Tabs
//         {...props}
//         TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
//     />
// ))({
//     '& .MuiTabs-indicator': {
//         display: 'flex',
//         justifyContent: 'center',
//         backgroundColor: 'transparent',
//     },
//     '& .MuiTabs-indicatorSpan': {
//         maxWidth: 40,
//         width: '100%',
//         backgroundColor: '#635ee7',
//     },
// });

// const StyledTab = styled((props) => <Tab disableRipple icon={<StoreIcon />} iconPosition="start" {...props} />)(
//     ({ theme }) => ({
//         textTransform: 'none',
//         fontWeight: theme.typography.fontWeightRegular,
//         fontSize: theme.typography.pxToRem(15),
//         marginRight: theme.spacing(1),
//         color: 'rgba(255, 255, 255, 0.7)',
//         '&.Mui-selected': {
//             color: '#fff',
//         },
//         '&.Mui-focusVisible': {
//             backgroundColor: 'rgba(100, 95, 228, 0.32)',
//         },
//     }),
// );

export default function Stock() {
    const [value, setValue] = useState(0);
    const [branchList, setBranchList] = useState([])
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [messageError, setMessageError] = useState("No Error")
    const [messageSuccess, setMessageSuccess] = useState("Notification")

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
       
    };
    async function LoadData() {
        try {
            const response = await branchApi.getAll()
            if (response.status == 200) {
                setBranchList(response.data)
                setMessageSuccess("Load Branch Successfully")
                setOpenSuccessAlert(true)
            }
            else {
                setMessageError("Load Branch Failed :((")
                setOpenErrorAlert(true)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        LoadData()
        return () => {
            setBranchList({}); // This worked for me
          };
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ bgcolor: '#2e1534', width: '100%' }}>
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    aria-label="styled tabs example"
                >
                    {
                        branchList.length > 0 && branchList.map((item, index) => (
                            <StyledTab key={index} label={item.address} />
                        ))
                    }
                </StyledTabs>
                <Box sx={{ p: 1 }} />
            </Box>
            {
                branchList.length > 0 && branchList.map((item, _index) =>
                (
                    <TabPanel key={_index} value={value} index={_index}>
                        <StockInBranch branch={item} />
                    </TabPanel>
                ))
               
            }
            <SnackBarAlert severity='success' open={openSuccessAlert} handleClose={handleClose} message={messageSuccess} />
            <SnackBarAlert severity='error' open={openErrorAlert} handleClose={handleClose} message={messageError} />
        </Box>
    );
}