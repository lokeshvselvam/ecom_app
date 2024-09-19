import { Avatar, Box, Skeleton } from '@mui/material'
import { blue, grey } from '@mui/material/colors';
import React from 'react'

const ImgNav = ({image, select, handleImageChange, productData, isLoading, isFetching}) => {

  const imageGallery =  productData?.info?.nowater_gallery?.detail_image;
  console.log(select)
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2}}>
      {
        isFetching ?
        Array.from({length: 6}).map((_, key) => (<Skeleton animation='wave' key={key} sx={{width: '100%', height: '93px'}} variant='rounded' />))
        :
        imageGallery !== null && imageGallery?.slice(0, 6)?.map((item, key) => {
          return <Box component={'img'} onClick={() => handleImageChange(item?.origin_image, key)} key={key} src={item?.origin_image} sx={{width: 70, height: 'auto', objectFit: 'contain', cursor: 'pointer', boxShadow: select === key && `0px 0px 8px ${grey[400]}`, border: select === key && `1px solid ${blue[800]}`, '&:hover': {boxShadow:`0px 0px 7px ${grey[400]}`}}} variant='rounded' />
        })
      }
    </Box>
  )
}

export default ImgNav