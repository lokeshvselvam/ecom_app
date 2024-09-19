import { Box, Stack } from "@mui/material"
import { blueGrey, grey } from "@mui/material/colors"
import { StyledTypography } from "../../utlities/StyledComponent"
import playstore from '../../assets/playstore.webp';
import applestore from '../../assets/apple.jpg';
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaSquareWhatsapp, FaXTwitter } from "react-icons/fa6";
import { ImYoutube2 } from "react-icons/im";

export const SocialMedia = () => {
    return (
        <Box sx={{ background: grey[300], padding: 3, borderRadius: .5 }}>
            <StyledTypography variant="h6" sx={{ fontWeight: 600, lineHeight:1.3, textTransform:'uppercase' }}>Experience decathlon app on mobile</StyledTypography>
            <Stack direction={'row'} justifyContent={'space-between'} mt={2}>
                <Box sx={{ background: 'black', padding: '2px 10px', borderRadius: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fit-content' }}>
                    <Box component={'img'} src={playstore} sx={{ width: '37px', height: '37px' }} />
                    <Stack justifyContent={'flex-start'}>
                        <StyledTypography variant="caption" sx={{ color: '#fff' }}>GET IT ON</StyledTypography>
                        <StyledTypography variant="body2" sx={{ fontWeight: 600, color: '#fff' }}>Google Play</StyledTypography>
                    </Stack>
                </Box>
                <Box sx={{ background: 'black', padding: '2px 10px', borderRadius: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fit-content' }}>
                    <Box component={'img'} src={applestore} sx={{ width: '40px', height: '40px' }} />
                    <Stack justifyContent={'flex-start'}>
                        <StyledTypography variant="caption" sx={{ color: '#fff' }}>GET IT ON</StyledTypography>
                        <StyledTypography variant="body2" sx={{ fontWeight: 600, color: '#fff', objectFit:'fill' }}>App Store</StyledTypography>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export const FollowUs = () => {
    return (
        <Box sx={{ background: grey[300], padding: 3, borderRadius: .5, mt:.5}}>
            <StyledTypography variant="h6" sx={{ fontWeight: 600, lineHeight:1.3 }}>FOLLOW US</StyledTypography>
            <Stack direction={'row'} justifyContent={'space-between'} my={2}>
                <AiFillInstagram size={30} color={blueGrey[800]} />
                <FaFacebookF size={30} color={blueGrey[800]} />
                <FaXTwitter size={30} color={blueGrey[800]} />
                <FaSquareWhatsapp size={30} color={blueGrey[800]} />
                <ImYoutube2 size={30} color={blueGrey[800]} />
            </Stack>
        </Box>
    )
}