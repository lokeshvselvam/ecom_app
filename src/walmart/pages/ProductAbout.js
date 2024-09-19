import { Box, Divider, Stack } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'
import TopNav from './TopNav';
import { useGetProductByIdQuery } from '../service/ServiceCall';
import { amber, blueGrey, grey, red, teal } from '@mui/material/colors';
import { StyledButton, StyledTooltip, StyledTypography } from '../utlities/StyledComponent';
import { FaStar } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { addToCart } from '../service/slice';
import { IoMdHeartEmpty } from 'react-icons/io';

const ProductAbout = () => {

    const { id } = useParams();
    const { data: products, isLoading } = useGetProductByIdQuery(id);
    const { cart } = useSelector(state => state.procuctAction);
    const dispatch = useDispatch();
    console.log(products)

    // product datas:
    const title = products?.product?.name;
    const price = products?.product?.whitePrice?.price;
    const max_price = products?.data?.product_price_max;
    const department = products?.product?.mainCategory?.name;
    const rating = products?.product?.whitePrice?.price.toString().slice(0, 1);
    const reviewRating = products?.data?.product_num_ratings.toString();
    const moreColors = products?.product?.articlesList;
    const sizeChart = products?.data?.product_variations?.size;
    const productCheck = products?.defaultArticle?.code;
    console.log()


    const handleAddToCart = (e) => {
      dispatch(addToCart(e));
      console.log(e)
    };

    // discount price:
    // const discountPrice = products?.data?.product_price?.toString()?.split('$');
    // const currentPrice = products?.data?.product_price_max?.toString()?.split('$');
    // const one = discountPrice[1];
    // const two = currentPrice[1]
    // const discountAmount = ((one - two) / one) * 100;
    // const discountPercentage = discountAmount?.toString()?.slice(0, 3);

  return (
    <Box sx={{ backgroundColor: grey[100], height: isLoading ? "100vh" : "100%" }} >
      <TopNav title={title} id={id} />
      <Stack direction={"row"} width={"100%"} sx={{ padding: "260px 20px" }}>
        <Stack sx={{ width: "60%" }} direction={"row"} justifyContent={"flex-start"} flexWrap={"wrap"} alignItems={"center"} gap={0.5} >
          {products?.product?.articlesList[0]?.galleryDetails?.map((value, index) => {
            return (
              <img src={value.baseUrl} key={index} width={"380px"} height={"auto"} />
            );
          })}
        </Stack>
        <Stack direction={"column"} width={"40%"}>
          <Stack direction={'column'}>
            <StyledTypography sx={{ fontSize: 22 }}> {department} </StyledTypography>
            <StyledTypography sx={{ fontSize: 25, color: blueGrey[500], lineHeight: '1' }}> {title} </StyledTypography>
            <Box sx={{ width: "fit-content", marginTop: 1, padding: "1px 8px", border: `1px solid ${blueGrey[200]}`, }} >
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <StyledTypography sx={{ fontWeight: 600 }}> {rating} </StyledTypography>
                <FaStar color={amber[700]} size={15} />
                <Divider variant="middle" orientation="vertical" color={blueGrey[800]} flexItem style={{ margin: "4px 0px" }} />
                <StyledTypography> {reviewRating} Ratings </StyledTypography>
              </Stack>
            </Box>
            <Divider color={blueGrey[800]} sx={{mt: 2}} />
          </Stack>
          <Stack direction={"row"} gap={2} alignItems={"baseline"} paddingTop={2}>
            <StyledTypography className="currentPrice"> $ {price} </StyledTypography>
            <StyledTypography style={{ textDecoration: "line-through", fontSize: 16 }} variant='body1'> {max_price} </StyledTypography>
            {/* <StyledTypography className='discountPercentage'>{`${discountPercentage}%`}</StyledTypography> */}
          </Stack>
          <StyledTypography sx={{color: teal[400], fontWeight: 600}}>inclusive of all taxes</StyledTypography>
          <StyledTypography sx={{fontSize: 18, padding: '15px 0px'}}>{moreColors && 'MORE COLORS'}</StyledTypography>
          <Stack direction={'row'} justifyContent={'flex-start'} gap={1} flexWrap={'wrap'}>
            {moreColors?.map((image, index) => {
              return (
                <StyledTooltip arrow title={image.value}>
                  <img width={'70px'} height={'100px'} style={{objectFit: 'cover'}} src={image.galleryDetails[0].baseUrl} key={index} />
                </StyledTooltip>
              )
            })}
          </Stack>
          {sizeChart &&
          <Stack direction={'row'} gap={3} alignItems={'baseline'}>
            <StyledTypography sx={{fontSize: 18, padding: '15px 0px'}}>SELECT SIZE</StyledTypography>
            <Stack direction={'row'} alignItems={'center'}>
              <StyledTypography sx={{color: red[800], fontSize: 15}}>Size Chart</StyledTypography>
              <MdKeyboardArrowRight color={red[800]} size={20} />
            </Stack>
          </Stack>}
          <Stack direction={'row'} justifyContent={'flex-start'} gap={1} flexWrap={'wrap'}>
            {sizeChart?.map((size, index) => {
                return (
                  <Box key={index} sx={{width: '50px', height: '50px', padding: '12px 0px', textAlign: 'center', borderRadius: '50%', border: `1px solid ${blueGrey[800]}`, '&:hover': {color: red[800]}}}>
                    <StyledTypography sx={{fontWeight: 700}}>{size.value === 'Small' && 'S' || size.value === 'Medium' && 'M' || size.value === 'Medium Tall' && 'M' || size.value === 'Large' && 'L' || size.value === 'Large Tall' && 'L' || size.value === 'X-Large' && 'XL' || size.value === 'X-Large Tall' && 'XL' || size.value === 'XX-Large' && 'XXL' || size.value === '2X Tall' && '2XL' || size.value === '3X-Large' && '3XL'}</StyledTypography>
                  </Box>
                )
              })}
          </Stack>
          <Stack direction={'row'} justifyContent={'flex-start'} gap={3} sx={{padding: '10px 0px'}}>
              {cart.some((someItem) => someItem.defaultArticle.code === productCheck) ?
              (<StyledButton className='checkout'>Checkout</StyledButton>)
              :
              (<StyledButton className='add' onClick={() => handleAddToCart(products)}> Add <LiaShoppingBagSolid size={25} /> </StyledButton>)
              }
              <StyledButton className='wishList'>Add to Wishlist <IoMdHeartEmpty size={25} /></StyledButton>
          </Stack>
          <StyledTypography></StyledTypography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ProductAbout