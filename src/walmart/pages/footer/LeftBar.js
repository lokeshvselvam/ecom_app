import { Box, Stack } from "@mui/material"
import { StyledTypography } from "../../utlities/StyledComponent"
import { blue, blueGrey, grey } from "@mui/material/colors"
import { VscPercentage } from "react-icons/vsc"
import { IoHappyOutline, IoReloadCircle } from "react-icons/io5"

export const OurPromise = () => {
    return (
        <Box sx={{ background: grey[300], padding: 3, borderRadius: .5 }}>
            <Stack direction={'row'} justifyContent={'space-evenly'} alignItems={'center'}>
                <StyledTypography variant="h6" sx={{ color: blueGrey[900], fontWeight: 600 }}> OUR PROMISES </StyledTypography>
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                    <VscPercentage size={25} color={blue[800]} />
                    <StyledTypography variant="body1" sx={{ color: blueGrey[900] }}> No cost EMI' Available </StyledTypography>
                </Stack>
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                    <IoReloadCircle size={25} color={blue[800]} />
                    <StyledTypography variant="body1" sx={{ color: blueGrey[900] }}> Easy Returns </StyledTypography>
                </Stack>
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                    <IoHappyOutline size={25} color={blue[800]} />
                    <StyledTypography variant="body1" sx={{ color: blueGrey[900] }}> 1 million+ happy Customers </StyledTypography>
                </Stack>
            </Stack>
        </Box>
    )
}

export const Support = () => {
    return (
        <Box mt={2} sx={{height:'195px', alignItems:'center', display:'flex', justifyContent:'space-between'}}>
            <Stack direction={'row'} justifyContent={'space-evenly'} alignItems={'flex-start'} width={'100%'}>
                <Stack>
                    <StyledTypography variant="body1" sx={{ color: blueGrey[900], fontWeight: 600 }}> Support </StyledTypography>
                    <StyledTypography variant="body2" sx={{ color: blueGrey[900] }}> Contact our Stores </StyledTypography>
                    <StyledTypography variant="body2" sx={{ color: blueGrey[900] }}> Delivery </StyledTypography>
                </Stack>
                <Stack>
                    <StyledTypography variant="body1" sx={{ color: blueGrey[900], fontWeight: 600 }}> OUR SERVICES </StyledTypography>
                    <StyledTypography variant="body2" sx={{ color: blueGrey[900] }}> Decathlon for Schools</StyledTypography>
                    <StyledTypography variant="body2" sx={{ color: blueGrey[900] }}> Decathlon for Corporates </StyledTypography>
                    <StyledTypography variant="body2" sx={{ color: blueGrey[900] }}> Decathlon for Sport Clubs</StyledTypography>
                    <StyledTypography variant="body2" sx={{ color: blueGrey[900] }}> Decathlon Gift Cards </StyledTypography>
                    <StyledTypography variant="body2" sx={{ color: blueGrey[900] }}> Installation & Assembly Services </StyledTypography>
                </Stack>
                <Stack>
                    <StyledTypography variant="body1" sx={{ color: blueGrey[900], fontWeight: 600 }}> ABOUT US </StyledTypography>
                    <StyledTypography variant="body2" sx={{ color: blueGrey[900] }}> Who we are</StyledTypography>
                    <StyledTypography variant="body2" sx={{ color: blueGrey[900] }}> Careers </StyledTypography>
                    <StyledTypography variant="body2" sx={{ color: blueGrey[900] }}> Made in India</StyledTypography>
                </Stack>
            </Stack>
        </Box>
    )
}

export const CopyRights = () => {
    return (
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', mb:2}}>
            <StyledTypography variant="body2" sx={{ color: blueGrey[900] }}> © 2024 Decathlon Sports India Pvt Ltd. All rights reserved.</StyledTypography>
            <StyledTypography variant="body2" sx={{ color: blueGrey[900], fontWeight:600 }}> By Lokesh Selvam </StyledTypography>
        </Box>
    )
}