import { Avatar, Box, Button, IconButton, ListItem, ListItemAvatar, ListItemText, Skeleton, Stack, Typography, useTheme, Zoom } from "@mui/material"
import { StyledProductCardWrapper, StyledRating, StyledTooltip, StyledTypography } from "../utlities/StyledComponent"
import { FaEye, FaEyeSlash, FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { blue, blueGrey, grey, orange, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishList, addtoWishlist, productSuccessToast, removeFromWishList } from "../service/slice";
import { IoMdCheckmark, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useState } from "react";
import 'swiper/css'
import W from '../assets/W__Blue_RGB.avif'
import { FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

export const ProductCard = ({ data, isLoading, isFetching, productData }) => {
    const theme = useTheme();
    const [view, setView] = useState(false);
    return (
        <StyledProductCardWrapper sx={{ position: 'relative', height: '100%' }}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} height={'100%'}>
                <Link to={view ? null : `/${data?.cate_name}/${data?.goods_id}`} onClick={() => view ? null : window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}>
                    <Box>
                        {
                            view ? <ProductImageCarousel data={data} isFetching={isFetching} isLoading={isLoading} /> : <ProductImage data={data} isFetching={isFetching} isLoading={isLoading} />
                        }
                    </Box>
                </Link>
                <Box>
                    <ProductLike data={data} view={view} setView={setView} />
                </Box>
                <Box
                    className='productCardHover'
                    sx={{
                        position: 'relative',
                        zIndex: 50,
                        transition: '.3s ease-in-out',
                        background: theme.palette.background.paper,
                    }}
                >
                    <ProductInfo data={data} isFetching={isFetching} isLoading={isLoading} />
                </Box>
                <ProductAdd data={data} />
            </Box>
        </StyledProductCardWrapper>
    )
}

export const ProductImage = ({ data, isLoading, isFetching }) => {
    return (
        <Box sx={{ margin: '47px 47px 0px 47px', }}>
            <Box component={'img'} src={data?.goods_img} sx={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
        </Box>
    )
}

export const ProductImageCarousel = ({ data, isLoading, isFetching }) => {
    return (
        <Box sx={{ margin: '47px 47px 0px 47px', }}>
            {
                isFetching ?
                    <Skeleton animation='wave' variant="rounded" sx={{ height: '330px', width: '100%' }} />
                    :
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        pagination={{
                            dynamicBullets: true,
                            clickable: true,

                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        className="mySwiper"
                    >
                        {
                            data?.detail_image?.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <Box component={'img'} src={item} sx={{ height: 'auto', objectFit: 'cover', width: '100%' }} />
                                    </SwiperSlide>
                                )
                            })
                        }

                    </Swiper>
            }
        </Box>
    )
}

export const ProductInfo = ({ data, isLoading, isFetching }) => {
    return (
        <Box sx={{ padding: '10px 20px 20px 20px' }}>
            <StyledTypography variant="body1" sx={{ fontWeight: 600 }}>{data?.goods_name.length > 25 ? data?.goods_name.slice(0, 25) + '...' : data?.goods_name}</StyledTypography>
            <StyledTypography variant="body2" sx={{color: grey[500]}}>{data?.cate_name}</StyledTypography>
            <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'stretch'} gap={1.3}>
                <StyledTypography variant="body2" sx={{ fontWeight: 600 }}>₹ {data?.salePrice?.priceShowStyle}</StyledTypography>
                <StyledTypography variant="caption" sx={{ textDecoration: 'line-through', color: grey[600], fontSize: 14}}>₹ {data?.retailPrice?.priceShowStyle}</StyledTypography>
                <StyledTypography variant="caption" sx={{color: orange[700], fontSize: 14}}>({data?.retailDiscountPercent}% OFF)</StyledTypography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'stretch'} py={1}>
                <StyledRating
                    value={data?.business_model}
                    icon={<FaStar />}
                    emptyIcon={<FaRegStar />}
                    readOnly
                    size="small"
                />
                {
                    data?.retailDiscountPercent > 20 &&
                    <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'flex-end'} gap={1}>
                        <StyledTypography variant="caption" sx={{ color: blue[700], fontSize: 12 }}>Save with</StyledTypography>
                        <Avatar src={W} sx={{ width: 30, height: 25 }} />
                    </Stack>
                }
            </Stack>
        </Box>
    )
}

export const ProductView = () => {
    return (
        <Box sx={{ position: 'absolute', top: 5, left: 5 }}>
            <Stack sx={{ }}>
                <IconButton size="small" className="productLike compare"><CiHeart /></IconButton>
            </Stack>
        </Box>
    )
}

export const ProductLike = ({data, view, setView}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {wishList} = useSelector((state) => state.procuctAction);
    const addWishlist = (data) => {
        dispatch(addToWishList(
            // {
            //     goods_id: data?.goods_id,
            //     goods_img: data?.goods_img,
            //     goods_name: data?.goods_name,
            //     goods_sPrice: data?.salePrice?.priceShowStyle,
            //     goods_rPrice: data?.retailPrice?.priceShowStyle,
            //     goods_dPrice: data?.retailDiscountPercent,
            // }
            data
        ))
    }
    const removeWishList = (data) => {
        dispatch(removeFromWishList(data))
    }
    //hideIcon <FaEyeSlash />
    return (
        <Box sx={{ position: 'absolute', top: 15, right: 15 }}>
            <Stack direction={'column'} justifyContent={'flex-start'} gap={1} sx={{ }}>
                {
                    wishList?.some((item) => item?.goods_id === data?.goods_id) ?
                    <IconButton size="small" sx={{opacity: 0, border: '.5px solid', borderRadius: 2, borderColor: theme.palette.divider}} className="productLike" onClick={() => removeWishList(data)}><IoMdHeart color={red[900]} /></IconButton>
                    :
                    <IconButton size="small" sx={{opacity: 0, border: '.5px solid', borderRadius: 2, borderColor: theme.palette.divider}} className="productLike" onClick={() => addWishlist(data)}><IoMdHeartEmpty color='black' /></IconButton>
                }
                <StyledTooltip arrow TransitionComponent={Zoom} title={view ? 'Hide Images' : 'View Images'}>
                <IconButton size="small" sx={{opacity: view ? 10 : 0, border: '.5px solid', borderRadius: 2, borderColor: theme.palette.divider, }} className="productView" onClick={()=>setView(!view)}>
                    {
                        view ? <FaEyeSlash color='black' /> : <FaEye color='black' />
                    }
                </IconButton>
                </StyledTooltip>
            </Stack>
        </Box>
    )
}

export const ProductAdd = ({data}) => {
    const dispatch = useDispatch();
    const {cart} = useSelector((state) => state.procuctAction);
    const addProductToCart = (data) => {
        if (data !== null && data !== undefined) {
            dispatch(addToCart(data));
        }
        const existingProduct = cart?.some((item) => ((item?.goods_id || item?.info?.goods_id) === data?.goods_id));
        if (existingProduct) {
            dispatch(productSuccessToast(null));
        } else {
            dispatch(productSuccessToast({ msg: 'Product added to cart successfully' }));
        }
        // console.log(data)
    }
    return (
        <Box
            sx={{
                position: 'absolute',
                background: cart?.some((item) => ((item?.goods_id || item?.info?.goods_id) === data?.goods_id)) ? red[900] : blueGrey[900],
                bottom: '0px',
                left: '0px',
                width: '100%',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center',
            }}
        >
            <Button onClick={() => addProductToCart(data)} sx={{color: grey[50], fontWeight: 600, textTransform: 'capitalize', width: '100%'}} 
                startIcon={
                    cart?.some((item) => ((item?.goods_id || item?.info?.goods_id) === data?.goods_id)) ? <IoMdCheckmark size={15} /> : <FiPlus size={15} />
                }
                >
                {
                    cart?.some((item) => ((item?.goods_id || item?.info?.goods_id) === data?.goods_id)) ? 'Added' : 'Add to Bag'
                }
            </Button>
        </Box>
    )
}