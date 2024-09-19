import React from 'react'
import { useGetSimilarProductsQuery } from '../../service/ServiceCall'
import { Box, Grid, Skeleton } from '@mui/material'
import { StyledTypography } from '../../utlities/StyledComponent'
import { ProductCard } from '../../components/ProductCard'

const SimilarProducts = ({ catId, goodsId }) => {

    const params = { catid: Number(catId), goodsid: Number(goodsId) };

    const { data: productData, isLoading, isFetching } = useGetSimilarProductsQuery(params);
    console.log(productData)

    return (
        <Box>
            <StyledTypography variant='h5' sx={{ fontWeight: 600 }}>Similar Products</StyledTypography>
            <Grid container display={'flex'} flexDirection={'row'} justifyContent={'space-between'} spacing={2} flexWrap={'wrap'} my={.5}>
                {
                    isFetching ?
                        Array.from({ length: 8 }).map((item, key) => {
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
                </Grid>
            </Grid>
        </Box>
    )
}

export default SimilarProducts