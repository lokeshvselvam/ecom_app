import { Box, Skeleton } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const Image = ({image, setImage, productData, isLoading, isFetching}) => {
  return (
    <Box>
        {
            isFetching ?
            <Skeleton animation='wave' sx={{width: '100%', height: '627px',}} variant='rounded' />
            :
            <Box component={'img'} src={image} sx={{ width: '100%', height: 'auto', objectFit: 'fill', borderRadius: 1, boxShadow: `0px 0px 7px ${grey[400]}`}} />
        }
    </Box>
  )
}

export default Image