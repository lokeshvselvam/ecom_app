import { Box, Stack } from '@mui/material'
import React from 'react'
import { IoShieldCheckmark } from 'react-icons/io5'
import { StyledTypography } from '../../utlities/StyledComponent'
import WALMART from '../../assets/purepng.com-walmart-logologobrand.png'
import { blueGrey } from '@mui/material/colors'

const Header = () => {
  return (
    <Box sx={{width: 'auto', height: 'auto', padding: '16px 23px'}}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Box component={'img'} src={WALMART} sx={{width: 200, height: 'auto'}} />
              <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={1}>
                  <IoShieldCheckmark size={35} color={blueGrey[800]} />
                  <Stack>
                      <StyledTypography variant='caption'>100%</StyledTypography>
                      <StyledTypography variant='caption'>Secure</StyledTypography>
                      <StyledTypography variant='caption'>Payment</StyledTypography>
                  </Stack>
              </Stack>
          </Stack>
    </Box>
  )
}

export default Header