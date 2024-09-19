import React from 'react'
import Image from '../../assets/pngtree-empty-shopping-cart-store-icon-png-image_5624129.png';
import { Box, Button } from '@mui/material';
import { StyledTypography } from '../../utlities/StyledComponent';
import { useNavigate } from 'react-router';
import { blue } from '@mui/material/colors';

const NoItems = () => {
    const navigation = useNavigate();
  return (
    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <Box component={'img'} src={Image} sx={{width: '300px', height: 'auto'}} />
        <StyledTypography variant='body1' sx={{}}>Hey, it feel so light</StyledTypography>
          <StyledTypography variant='caption' sx={{ fontWeight: 600 }}>There is nothing in your bag, let's add some items.</StyledTypography>
        <Button onClick={() => navigation('/')} variant='outlined' disableElevation sx={{borderRadius:0, border:`.5px solid ${blue[800]}`, padding:'6px 14px', my:2, fontWeight:600, textTransform:'capitalize'}}>
            Add Items from Wishlist
        </Button>
    </Box>
  )
}

export default NoItems