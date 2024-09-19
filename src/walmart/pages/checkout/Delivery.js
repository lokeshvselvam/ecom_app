import { Box, Button, Stack, useTheme } from '@mui/material'
import React from 'react'
import { StyledTypography } from '../../utlities/StyledComponent'
import { blue, blueGrey, grey } from '@mui/material/colors';
import { HiOutlineTruck } from 'react-icons/hi';
import { MdOutlineStore } from 'react-icons/md';

const Delivery = () => {

    const theme = useTheme();

    const address = [
        { id: 1, type: 'Home Delivery', info: 'Get it by Tomorrow', address: 'No. 94, Westcross Street, Chennai, Tamil Nadu, 600 949', icon: <HiOutlineTruck size={25} />, addressType: 'Delivery Address', typeChange: 'Login to add Delivery Address' },
        { id: 2, type: 'Pick from Store', info: 'Pick after 12pm', address: 'Eva Mall, No. 60, Ashok Nagar, Victoria Layout Bangalore, Karnataka, 560025', icon: <MdOutlineStore size={25} />, addressType: 'Store Address', typeChange: 'Change pickup point' }
    ]

    return (
        <Box>
            <Box sx={{ background: '#ffff', padding: 3, mb: 3 }}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                    <Stack>
                        <StyledTypography variant='h5' sx={{ fontWeight: 600 }}>Select Delivery Option</StyledTypography>
                        <StyledTypography variant='caption'>Choose home delivery or pickup from store</StyledTypography>
                    </Stack>
                    <Stack direction={'row'} alignItems={'flex-start'} gap={1}>
                        <StyledTypography variant='body1'>Pincode: <span style={{ fontWeight: 600 }}>603 492</span></StyledTypography>
                        <StyledTypography variant='body1' sx={{ textDecoration: 'underline', color: blue[800] }}>Change</StyledTypography>
                    </Stack>
                </Stack>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 3 }}>
                    {
                        address.map((item, index) => {
                            return (
                                <Box sx={{ border: '2px solid', borderStyle: item.id === 1 ? 'solid' : 'dashed', borderColor: item.id === 1 ? theme.palette.grey[300] : blue[800], background: item.id === 1 ? 'transparent' : blueGrey[50], padding: 3, width: '100%', height: 'auto' }}>
                                    <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={1}>
                                        <Box sx={{ background: theme.palette.grey[200], width: 'fit-content', padding: '9px 12px' }}>{item.icon}</Box>
                                        <Stack direction={'column'} justifyContent={'flex-start'}>
                                            <StyledTypography variant="body2" sx={{ fontWeight: 600 }}>{item.type}</StyledTypography>
                                            <StyledTypography variant="body2" >{item.info}</StyledTypography>
                                        </Stack>
                                    </Stack>
                                    <StyledTypography variant="caption" sx={{ color: grey[500], my: 2 }}>{item.addressType}</StyledTypography>
                                    <StyledTypography variant="body1" >{item.address}</StyledTypography>
                                    <Button size='small' sx={{ width: 'fit-content', borderRadius: 0, mt: 3, background: item.id === 1 ? blue[800] : grey[50], fontWeight: 600, color: item.id === 1 ? theme.palette.grey[50] : 'black', padding: '3px 20px' }} disableElevation>{item.typeChange}</Button>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
            <FreeDelivery />
        </Box>
    )
}

export default Delivery

export const FreeDelivery = () => {
    return (
        <Box sx={{width: 'auto', background: '#ffff', padding: 2.5, mb: 3}}>
            <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
                <HiOutlineTruck size={25} />
                <StyledTypography variant="body2">Add items worth <span style={{fontWeight: 600}}>₹1,500</span> to avail <span style={{fontWeight: 600}}>free delivery.</span></StyledTypography>
            </Stack>
        </Box>
    )
}