import { Avatar, Box, Button, IconButton, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { StyledRating, StyledTypography } from '../../utlities/StyledComponent'
import { blue, blueGrey, green, grey, orange, red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishList, productSuccessToast, removeFromWishList } from '../../service/slice';
import { IoIosCheckmarkCircleOutline, IoMdCheckmark, IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IoReloadCircle } from 'react-icons/io5';
import { GiSwipeCard } from 'react-icons/gi';
import { MdOutlineKeyboardArrowRight, MdOutlineStore } from 'react-icons/md';
import { BsStars } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';
import { useGetProductByIdQuery } from '../../service/ServiceCall';
import { HiOutlineTruck } from 'react-icons/hi';
import { LiaRupeeSignSolid } from 'react-icons/lia';

const Details = ({ productData, isLoading, isFetching }) => {

    //Product Data
    const storeTitle = productData?.info?.brandDetailInfo?.name;
    const productTitle = productData?.info?.goods_name;
    const rating = productData?.info?.cat_id;
    const productSalePrice = productData?.info?.sale_price?.priceShowStyle;
    const productRetailPrice = productData?.info?.retail_price?.priceShowStyle;
    const productDiscountPrice = productData?.info?.discountPrice?.priceShowStyle;
    const otherColors = productData?.info?.related_color_goods;
    const visitOtherColor = productData?.info?.related_color_goods?.goods_id;
    const soldBy = productData?.info?.storeInfo?.title;
    const productSize = productData?.info?.multiLevelSaleAttribute?.skc_sale_attr[0]?.attr_value_list;

    //state
    const [colorId, setColorId] = useState('');
    const [selectSize, setSelectSize] = useState(null);
    const [selectColor, setSelectColor] = useState(null);
    const [visible, setVisible] = useState(false);

    const theme = useTheme();
    const dispatch = useDispatch();
    const { wishList, cart } = useSelector((state) => state.procuctAction);
    const { data: vistByColorData } = useGetProductByIdQuery(colorId);
    // console.log(productData);

    const addWishlist = (data) => {
        dispatch(addToWishList( data ));
    }

    const removeWishList = (data) => {
        dispatch(removeFromWishList(data));
    }

    const addProductToCart = (data) => {
        const existingProduct = cart?.some((item) => ((item?.goods_id || item?.info?.goods_id) === data?.info?.goods_id));
        if (data && selectSize === null) {
            setVisible(true);
        } else if (data && selectSize !== null) {
            setVisible(visible);
            dispatch((addToCart(data)));
            if (existingProduct) {
                dispatch(productSuccessToast(null));
            } else {
                dispatch(productSuccessToast({ msg: 'Product added to cart successfully' }));
            }
        }
    }

    const handleVisitColor = (data, index) => {
        setSelectColor(index);
    };

    const handleSize = (index) => {
        setSelectSize(index);
    }

    useEffect(() => {
        handleVisitColor();
    }, [selectSize]);

    return (
        <Box mx={1} sx={{ height: '680px', overflow: 'auto', padding: '5px 10px' }}>
            <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'flex-end'} gap={2}>
                <StyledTypography variant='h5' sx={{ color: orange[700] }}>{storeTitle}</StyledTypography>
                {
                    wishList?.some((item) => (item?.goods_id || item?.info?.goods_id) === productData?.info?.goods_id) ?
                        <IconButton size="small" sx={{ border: '.5px solid', borderRadius: 2, borderColor: theme.palette.divider }} onClick={() => removeWishList(productData)}><IoMdHeart color={red[900]} /></IconButton>
                        :
                        <IconButton size="small" sx={{ border: '.5px solid', borderRadius: 2, borderColor: theme.palette.divider }} onClick={() => addWishlist(productData)}><IoMdHeartEmpty color='black' /></IconButton>
                }
            </Stack>
            <StyledTypography variant='body1' sx={{ pt: 1 }}>{productTitle}</StyledTypography>
            <Stack py={1} direction={'row'} justifyContent={'flex-start'} alignItems={'stretch'} gap={1.3}>
                <StyledRating
                    value={3}
                    icon={<FaStar />}
                    emptyIcon={<FaRegStar />}
                    readOnly
                    size="small"
                />
                <StyledTypography variant='body2'>({productData?.info?.business_model})</StyledTypography>
                <StyledTypography variant='body2' sx={{ textDecoration: 'underline' }}>{rating} reviews</StyledTypography>
            </Stack>
            <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'baseline'} gap={1.3} py={1}>
                <StyledTypography variant="h6" sx={{ fontWeight: 600 }}>₹{productSalePrice}</StyledTypography>
                {
                    productSalePrice < productRetailPrice &&
                    <>
                        <StyledTypography variant="body2" sx={{ color: grey[600], fontSize: 14 }}>MRP: <span style={{ textDecoration: 'line-through' }}>₹{productRetailPrice}</span></StyledTypography>
                        <StyledTypography variant="body2" sx={{ fontWeight: 600, color: green[500] }}>You save ₹{productDiscountPrice}</StyledTypography>
                    </>
                }
            </Stack>
            <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={.5} py={1} px={2}>
                <IoReloadCircle size={19} color={blue[800]} />
                <StyledTypography variant="caption" sx={{ fontWeight: 600 }}>Free 30-day returns</StyledTypography>
            </Stack>
            {
                productSize?.length > 0 &&
                <Box sx={{ my: 1 }}>
                    <StyledTypography variant="h5" sx={{ fontWeight: 600 }}>Choose Size</StyledTypography>
                    <Stack direction={'row'} justifyContent={'flex-start'} flexWrap={'wrap'} gap={3} columnGap={1} pt={.5} px={2}>
                        {
                            productSize !== null && productSize?.slice(0, 8)?.map((item, index) => {
                                return <StyledTypography
                                    key={index}
                                    sx={{
                                        border: index === selectSize ? `.5px solid ${blue[800]}` : 'none',
                                        cursor: 'pointer',
                                        padding: '3px 9px',
                                        fontWeight: index === selectSize ? 700 : 600,
                                        color: index === selectSize && blue[800],
                                    }}
                                    onClick={() => handleSize(index)} variant='body2'>{item?.attr_value_name}</StyledTypography>
                            })
                        }
                    </Stack>
                    {
                        visible &&
                        <StyledTypography variant='caption' sx={{ color: theme.palette.error.main, mx: 3, mt: 1, display: cart?.some((item) => ((item?.goods_id || item?.info?.goods_id) === productData?.info?.goods_id)) ? 'none' : 'block' }}>Please select a size.</StyledTypography>
                    }
                </Box>
            }
            {
                otherColors?.length > 0 &&
                <Box sx={{ my: 1 }}>
                    <StyledTypography variant="h5" sx={{ fontWeight: 600 }}>Other Colors</StyledTypography>
                    <Stack direction={'row'} justifyContent={'flex-start'} flexWrap={'wrap'} gap={2} pt={.5}>
                        {
                            otherColors !== null && otherColors?.map((item, index) => {
                                return <Avatar
                                    component={'a'}
                                    onClick={() => handleVisitColor(item?.goods_id, index)}
                                    key={index}
                                    src={item?.goods_image}
                                    sx={{
                                        width: 70, height: 70,
                                        objectFit: 'contain',
                                        borderRadius: 2,
                                        outline: index === selectColor && `2px solid ${blue[800]}`,
                                        cursor: 'pointer',
                                        outlineOffset: 2,
                                    }} />
                            })
                        }
                    </Stack>
                </Box>
            }
            <Box sx={{ my: 1.5 }}>
                <StyledTypography variant="h5" sx={{ fontWeight: 600 }}>Offers</StyledTypography>
                <Stack direction={'row'} justifyContent={'flex-start'} gap={1} pt={.5}>
                    <Button startIcon={<GiSwipeCard size={22} color='black' />} sx={{ width: '100%', background: grey[200], display: 'flex', justifyContent: 'flex-start', pl: 4, borderRadius: 0 }}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                            <Stack px={3}>
                                <StyledTypography variant="caption" sx={{ fontWeight: 600 }}>Buy 2 get ₹99 OFF/-</StyledTypography>
                                <StyledTypography variant="caption" sx={{ fontWeight: 400 }}>Limited Period Offer</StyledTypography>
                            </Stack>
                            <Stack pr={1}>
                                <MdOutlineKeyboardArrowRight size={16} />
                            </Stack>
                        </Stack>
                    </Button>
                </Stack>
            </Box>
            <Box my={2} display={'flex'} flexDirection={'row'} gap={2}>
                <Button variant='contained' disableElevation
                    sx={{
                        width: 'fit-content', background: cart?.some((item) => ((item?.goods_id || item?.info?.goods_id) === productData?.info?.goods_id)) ? red[900] : blue[900],
                        padding: '8px 48px', textTransform: 'capitalize', fontWeight: 600, borderRadius: 0
                    }}
                    onClick={() => addProductToCart(productData)}
                    startIcon={
                        cart?.some((item) => ((item?.goods_id || item?.info?.goods_id) === productData?.info?.goods_id)) ? <IoMdCheckmark size={15} /> : <FiPlus size={15} />
                    }
                >
                    {
                        cart?.some((item) => ((item?.goods_id || item?.info?.goods_id) === productData?.info?.goods_id)) ?
                            'Added' : 'Add to bag'
                    }
                </Button>
                <Button variant='outlined' sx={{ width: 'fit-content', padding: '8px 68px', textTransform: 'capitalize', fontWeight: 600, borderRadius: 0, color: blueGrey[800], borderColor: blueGrey[800] }} startIcon={<BsStars size={22} color='black' />}>
                    2 YEARS WARRENTY*
                </Button>
            </Box>
            <Box sx={{ my: 2 }}>
                <StyledTypography variant="h5" sx={{ fontWeight: 600 }}>Delivery & Services</StyledTypography>
                <Stack direction={'row'} justifyContent={'flex-start'} gap={1} pt={.5}>
                    <Button sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 0, width: '60%', padding: '8px 12px', borderColor: theme.palette.divider, color: blueGrey[800], textTransform: 'capitalize' }} variant='outlined'>
                        <Stack direction={'row'} justifyContent={'flex-start'} gap={1}>
                            <StyledTypography variant="body2" sx={{ fontWeight: 600 }}>603 383</StyledTypography>
                            <IoIosCheckmarkCircleOutline size={20} />
                        </Stack>
                        Change
                    </Button>
                </Stack>
                <Box sx={{ my: 3, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 2 }}>
                    <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={1}>
                        <Box sx={{ background: grey[200], width: 'fit-content', padding: '9px 12px' }}><HiOutlineTruck size={20} /></Box>
                        <Stack direction={'column'} justifyContent={'flex-start'}>
                            <StyledTypography variant="body2" >Home Delivery by <span style={{ fontWeight: 600 }}>Tomorrow</span></StyledTypography>
                            <StyledTypography variant="body2" >Order within <span style={{ fontWeight: 600, color: green[500] }}>5hrs 32mins</span></StyledTypography>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={1} marginLeft={3}>
                        <Box sx={{ background: grey[200], width: 'fit-content', padding: '9px 12px' }}><MdOutlineStore size={20} /></Box>
                        <Stack direction={'column'} justifyContent={'flex-start'}>
                            <StyledTypography variant="body2" ><span style={{ fontWeight: 600 }}>FREE</span> pickup in Store Available</StyledTypography>
                            <StyledTypography variant="body2" >View nearest stores</StyledTypography>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={1}>
                        <Box sx={{ background: grey[200], width: 'fit-content', padding: '9px 12px' }}><LiaRupeeSignSolid size={20} /></Box>
                        <Stack direction={'column'} justifyContent={'flex-start'}>
                            <StyledTypography variant="body2" >Pay on Delivery available *</StyledTypography>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
            <Box sx={{ my: 1.5 }}>
                <StyledTypography variant="h5" sx={{ fontWeight: 600 }}>Seller Details</StyledTypography>
                <StyledTypography variant="body1">Sold and Fulfilled by: <span style={{ fontWeight: 600 }}>{soldBy}</span></StyledTypography>
            </Box>
            <ProductInfo productData={productData} isFetching={isFetching} isLoading={isLoading} />
        </Box>
    )
}

export default Details

export const ProductInfo = ({ productData, isLoading, isFetching }) => {
    return (
        <Box>
            <Box sx={{ my: 1.5 }}>
                <StyledTypography variant="h5" sx={{ fontWeight: 600 }}>Product Details</StyledTypography>
                <Stack justifyContent={'flex-start'}>
                    {
                        productData?.info?.productDetails?.map((item, index) => {
                            return (
                                <Stack key={index} direction={'row'} alignItems={'baseline'} gap={1}>
                                    <StyledTypography variant="body1">{item?.attr_name}:</StyledTypography>
                                    <StyledTypography variant="body2" sx={{ fontWeight: 600, }}>{item?.attr_value}</StyledTypography>
                                </Stack>
                            )
                        })
                    }
                </Stack>
            </Box>
        </Box>
    )
}