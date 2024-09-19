import { Box, Button, Divider, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledTypography } from '../../utlities/StyledComponent';
import { blue, grey, orange } from '@mui/material/colors';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const Payment = () => {

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDisPrice, setTotalDisPrice] = useState(0);
  const [charge, setCharge] = useState(39);
  const total = charge + totalPrice;

  const { cart } = useSelector((state) => state.procuctAction);
  const theme = useTheme();

  //PRODUCT DATA
  const productSalePrice = cart?.salePrice?.amount || cart?.info?.sale_price?.amount;
  const productDisPrice = cart?.info?.discountPrice?.amount || cart?.discountPrice?.amount;
  const productSale = cart?.is_on_sale || cart?.info?.is_on_sale;

  useEffect(() => {
    setTotalPrice(cart?.reduce((current, acc) => current + ((acc?.is_on_sale || acc?.info?.is_on_sale) * (acc?.salePrice?.amount || acc?.info?.sale_price?.amount)), 0));
    setTotalDisPrice(cart?.reduce((current, acc) => current + ((acc?.is_on_sale || acc?.info?.is_on_sale) * (acc?.info?.discountPrice?.amount || acc?.discountPrice?.amount)), 0));
  }, [cart]);

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{ background: '#fff', padding: 2 }}>
        <StyledTypography variant='h6' sx={{ fontWeight: 600 }}>Order Summary</StyledTypography>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} mt={1.5}>
          <StyledTypography variant='body2' sx={{}}>Total price (Inc GST)</StyledTypography>
          <StyledTypography variant='body2' sx={{ fontWeight: 600 }}>₹{totalPrice}</StyledTypography>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} mt={.7}>
          <StyledTypography variant='body2' sx={{}}>Discount</StyledTypography>
          <StyledTypography variant='body2' sx={{ fontWeight: 600 }}>- ₹{totalDisPrice}</StyledTypography>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} mt={.7}>
          <StyledTypography variant='body2' sx={{}}>Convenience Fee</StyledTypography>
          <StyledTypography variant='body2' sx={{ fontWeight: 600 }}>₹{charge}</StyledTypography>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} mt={.7}>
          <StyledTypography variant='body2' sx={{ fontWeight: 600 }}>Total</StyledTypography>
          <StyledTypography variant='body2' sx={{ fontWeight: 600 }}>₹{total}</StyledTypography>
        </Stack>
        <Box sx={{ background: orange[400], padding: '10px 7px', textAlign: 'center', my: 2 }}>
          <StyledTypography variant='body1' sx={{ fontWeight: 600, color: 'white' }}>You save ₹{totalPrice} in this order</StyledTypography>
        </Box>
      </Box>
      <Button disableElevation sx={{background: blue[800], padding:'10px 15px', color: '#fff', width: '100%', my:2, borderRadius:0, fontWeight:600}}>PROCEEDE TO CHECKOUT</Button>
      <ReturnOptions />
    </Box>
  )
}

export default Payment

export const ReturnOptions = () => {

  const data = [
    {id: 1, icon: <IoIosCheckmarkCircleOutline size={28} />, info: 'Easy returns'},
    {id: 2, icon: <IoIosCheckmarkCircleOutline size={28} />, info: 'Home Delivery at Your Doorstep'},
    {id: 3, icon: <IoIosCheckmarkCircleOutline size={28} />, info: 'Minimum 2 years warranty'}
  ]
  return (
    <Box sx={{display:'flex', flexDirection:'row', flexWrap:'wrap', gap:1, justifyContent:'space-between'}}>
      {
        data.map((item, index) => {
          return (
            <Box key={index} sx={{ boxShadow: `0px 0px 3px ${grey[200]}`, background: '#fff', width:'100px', padding: '16px 7px', display:'flex', flexDirection:'column', alignItems:'center'}}>
              {item.icon}
              <StyledTypography variant='caption' sx={{textAlign:'center', lineHeight:'1.3'}}>{item.info}</StyledTypography>
            </Box>
          )
        })
      }
    </Box>
  )
}