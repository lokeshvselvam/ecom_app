import { Box, IconButton, List, ListItem, Menu, Stack, useTheme } from "@mui/material"
import { blue, blueGrey, grey, red } from "@mui/material/colors";
import { IoMdClose, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../service/slice";
import { StyledTypography } from "../utlities/StyledComponent";
import Image from '../assets/pngtree-empty-shopping-cart-store-icon-png-image_5624129.png';
import { Link } from "react-router-dom";

export const WishList = ({ open, onClick, onClose, anchorEl }) => {

    const theme = useTheme();
    const { wishList } = useSelector((state) => state.procuctAction);
    console.log(wishList)

    return (
        <Box>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                PaperProps={{
                    style: {
                        borderRadius: 9,
                        marginTop: 0,
                        background: '',
                        marginLeft: 4,
                        width: '310px',
                        height: wishList?.length > 5 ? '300px' : 'auto',
                        color: grey[700],
                    }
                }}
            >
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} padding={'0px 5px 0px 10px'}>
                   <StyledTypography variant="h6" sx={{ fontWeight: 600 }}>My Items</StyledTypography>
                   <IconButton size="small" onClick={onClose}><IoMdClose size={25} /></IconButton>
                </Stack>
                <StyledTypography variant="body2" sx={{ paddingLeft:'10px', paddingBottom:'5px' }}>{wishList?.length > 1 ? wishList?.length + ' Items' : wishList?.length + ' Item'}</StyledTypography>
                {
                    wishList?.length > 0 ?
                        <Stack direction={'row'} justifyContent={'flex-start'} flexWrap={'wrap'} gap={1} padding={'5px 17px'}>
                            {
                                wishList !== null && wishList?.map((item, key) => {
                                    return <Product data={item} wishList={wishList} key={key} />
                                })
                            }
                        </Stack>
                        :
                        <NoItem />
                }
            </Menu>
        </Box>
    )
}

export const Product = ({data, wishList}) => {

    const dispatch = useDispatch();
    const theme = useTheme();

    const removeWishList = (data) => {
        dispatch(removeFromWishList(data))
    }

    return(
        <Box sx={{ width: '130px', height: '100px', position: 'relative', border: `.5px solid ${blue[800]}`, overflow:'hidden' }}>
            <Link to={`/${data?.cate_name}/${data?.goods_id}`} onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}>
                <Box component={'img'} src={data?.info?.goods_img || data?.goods_img} sx={{ width: '130px', height: '100px', objectFit: 'cover' }} />
            </Link>
            <IconButton size="small" sx={{ border: '.5px solid', borderRadius: 2, borderColor: theme.palette.divider, position: 'absolute', top: 5, right: 5, background: '#ffff' }} onClick={() => removeWishList(data)}>
                <IoMdHeart color={red[900]} size={15} />
            </IconButton>
        </Box>
    )
}

export const NoItem = () => {
    return (
        <Stack justifyContent={'center'} alignItems={'center'}>
            <Box component={'img'} src={Image} sx={{width: '140px', height: 'auto'}} />
        </Stack>
    )
}