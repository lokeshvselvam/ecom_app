import { Box, Divider, Grid } from '@mui/material'
import React from 'react'
import { CopyRights, OurPromise, Support } from './LeftBar'
import { FollowUs, SocialMedia } from './RightBar'

const Footer = () => {
  return (
    <Box sx={{ml:2, mr:2, mb:.5}}>
        <Grid container spacing={.5} justifyContent={'space-between'}>
            <Grid item lg={9}>
                <OurPromise />
                <Support />
            </Grid>
            <Grid item lg={3}>
                <SocialMedia />
                <FollowUs />
            </Grid>
            <Grid item lg={12}>
            <Divider sx={{m:'5px 0px 10px 0px'}} />
            <CopyRights />
            </Grid>
        </Grid>
    </Box>
  )
}

export default Footer