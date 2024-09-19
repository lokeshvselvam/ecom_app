import { Box } from '@mui/material';
import { blue, blueGrey, grey, orange } from '@mui/material/colors';
import React from 'react'
import { FaRegCircleCheck } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { StyledTypography } from './StyledComponent';

const ProductSuccess = () => {

    const {successToast} = useSelector((state) => state.procuctAction);

  return (
    <Box sx={{
            background: blue[800],
            boxShadow: `0px 0px 5px ${blueGrey[800]}`,
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
            position: 'fixed',
            right: '40px',
            bottom: '90px',
            zIndex: 300,

        }}
    >
        <FaRegCircleCheck size={28} color={orange[600]} />
        <StyledTypography variant='body1' sx={{color: '#fff'}}>{successToast?.msg}</StyledTypography>
    </Box>
  )
}

export default ProductSuccess