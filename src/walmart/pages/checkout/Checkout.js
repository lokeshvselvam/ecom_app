import { Box, Grid } from '@mui/material'
import React from 'react'
import Header from './Header'
import { Items } from './Items'
import Payment from './Payment'
import Delivery from './Delivery'
import { useSelector } from 'react-redux'
import NoItems from './NoItems'
import Footer from '../footer/Footer'

const Checkout = () => {

    const { cart } = useSelector((state) => state.procuctAction);

    return (
        <Box>
            <Header />
            {
                cart?.length > 0 ?
                    <Box>
                        <Box sx={{ margin: '20px 90px' }}>
                            <Grid container spacing={2}>
                                <Grid item lg={8} sx={{ marginBottom: 5 }}>
                                    <Delivery />
                                    <Items productData={cart} />
                                </Grid>
                                <Grid item lg={4} sx={{}}>
                                    <Payment />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <Footer />
                        </Box>
                    </Box>
                    :
                    <NoItems />
            }
        </Box>
    )
}

export default Checkout