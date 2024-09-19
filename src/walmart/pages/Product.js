import { Box, Grid, Pagination, Skeleton, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useGetProductsQuery, useGetProductByIdQuery, useGetProductsBySearchQuery } from '../service/ServiceCall'
import { ProductCard } from '../components/ProductCard'
import { useSelector } from 'react-redux'

const Product = () => {

  const [page, setPage] = useState(0);
  const {searchText, cart} = useSelector((state) => state.procuctAction);
  const textQuery = searchText?.text;
  const { data: productData, isFetching, isLoading } =  useGetProductsQuery(page);
  const { data: searchProductData, isFetching: searchIsFetching , isLoading: searchIsLoading } = useGetProductsBySearchQuery(textQuery);
  // console.log(productData, cart);

  const handlePage = (i, event) => {
    setPage(event);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  useEffect(() => {
    handlePage();
  }, [textQuery]);

  return (
    <Box sx={{ mt:26, padding: '0px 45px 30px 45px', backgroundColor: grey[100], height: "100%" }}>
      <Grid container display={'flex'} flexDirection={'row'} justifyContent={'space-between'} spacing={2} flexWrap={'wrap'}>
        {
          isFetching ?
            Array.from({ length: 20 }).map((item, key) => {
              return (
                <Grid item lg={3} md={4} sm={4} xs={12} width={'100%'} height={'100%'}>
                  <Skeleton animation='wave' key={key} variant='rounded' sx={{ width: '100%', height: '340px' }} />
                </Grid>
              )
            })
            :
            productData !== null && productData?.info?.products?.map((item, index) => {
              return (
                <Grid item lg={3} md={4} sm={4} xs={12} width={'100%'} height={'100%'}>
                  <ProductCard productData={productData} data={item} key={index} isFetching={isFetching} isLoading={isLoading} />
                </Grid>
              )
            })
        }
        <Grid item lg={12} mg={12} sm={12} xs={12} display={'flex'} justifyContent={'flex-end'} mt={2}>
          <Pagination onChange={handlePage} count={10} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Product