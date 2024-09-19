import React, { useEffect, useState } from 'react'
import { StyledBadge, StyledSearchBar, StyledTopNav, StyledTypography } from '../utlities/StyledComponent'
import { Badge, Box, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from '@mui/material'
import { Stack } from '@mui/system'
import '../css/Amazon.css'
import HM from '../assets/H&M-Logo.svg.png';
import EBAY from '../assets/EBay_logo.png';
import WALMART from '../assets/purepng.com-walmart-logologobrand.png';
import { IoMdHeartEmpty } from "react-icons/io";
import { LiaShoppingBagSolid } from 'react-icons/lia'
import { PiDotsThreeOutlineLight } from 'react-icons/pi'
import { blue, blueGrey, grey, indigo, orange, red } from '@mui/material/colors';
import { SlUser } from "react-icons/sl";
import { FiSearch } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import { searchProText } from '../service/slice'
import { useTheme } from '@emotion/react'
import { CgMenuGridR } from 'react-icons/cg'
import { WishList } from '../components/WishListProduct'

const TopNav = (props) => {

    const { title, id } = props;
    const location = useLocation();
    const { goods_id } = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();

    const { cart, wishList, searchText } = useSelector((state) => state.procuctAction);

    const [search, setSearch] = useState(null);
    const [displayValue, setDisplayValue] = useState(null);
    const [visible, setVisible] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDisPrice, setTotalDisPrice] = useState(0);
    const [charge, setCharge] = useState(cart.length > 0 ? 39 : 0);

    const [anchorEl, setAnchorEl] = useState(null);
    const [viewWishList, setViewWishList] = useState(null);
    const open = Boolean(anchorEl);
    const viewList = Boolean(viewWishList);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleViewListOpen = (event) => {
        setViewWishList(event.currentTarget);
    };
    const handleViewListClose = () => {
        setViewWishList(null);
    };

    const total = charge + totalPrice;

    const topMenu = [
        { id: 1, name: 'Men', link: '#men' },
        { id: 2, name: 'Ladies', link: '#ladies' },
        { id: 3, name: 'Baby', link: '#baby' },
        { id: 4, name: 'Kids', link: '#kids' },
        { id: 5, name: 'Walmart Home', link: '#walmarthome' },
        { id: 6, name: 'Sport', link: '#sport' },
        { id: 7, name: 'Sale', link: '#sale' },
        { id: 8, name: 'Sustainability', link: '#sustainability' },
    ]

    const handleClick = () => {
        setDisplayValue(search);
        setSearch('');
        // dispatch(searchProText({text: search}));
    };

    const heightCheck = () => {
        let height = 50;
        const body = document.body.scrollTop || document.documentElement.scrollTop;
        if (body > height) {
            setVisible(!visible)
        } else {
            setVisible(visible)
        }
    }

    useEffect(() => {
        handleClick();
    }, [displayValue]);

    useEffect(() => {
        setTotalPrice(cart?.reduce((current, acc) => current + ((acc?.is_on_sale || acc?.info?.is_on_sale) * (acc?.salePrice?.amount || acc?.info?.sale_price?.amount)), 0));
        setTotalDisPrice(cart?.reduce((current, acc) => current + ((acc?.is_on_sale || acc?.info?.is_on_sale) * (acc?.info?.discountPrice?.amount || acc?.discountPrice?.amount)), 0));
    }, [cart]);

    useEffect(() => {
        window.addEventListener('scroll', heightCheck);
    }, []);

    return (
        <StyledTopNav>
            <Toolbar>
                <Grid container alignItems={'center'}>
                    <Grid item lg={4} md={4} sm={4} xs={4} pl={5}>
                        {
                            visible ?
                                <Stack direction={'row'} gap={3} alignItems={'center'} sx={{ display: { xs: 'none', sm: 'none', lg: 'flex' } }}>
                                    <StyledTypography>Customer Service</StyledTypography>
                                    <StyledTypography>Newsletter</StyledTypography>
                                    <StyledTypography>Find a store</StyledTypography>
                                    <PiDotsThreeOutlineLight size={30} className='navbarIcon' />
                                </Stack>
                                :
                                <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
                                    <IconButton onClick={handleOpen} size='small'><CgMenuGridR size={35} color={blueGrey[900]} /></IconButton>
                                    <StyledSearchBar
                                        value={search}
                                        type='text'
                                        placeholder='Seach...'
                                        endAdornment={
                                            <InputAdornment position='end' sx={{ pr: 1 }}>
                                                <IconButton size='small' onClick={handleClick}><FiSearch size={20} /></IconButton>
                                            </InputAdornment>}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <Menu
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        PaperProps={{
                                            style: {
                                                borderRadius: 9,
                                                marginTop: 5,
                                                background: '',
                                                marginLeft: 4,
                                                width: '160px',
                                                color: grey[700],
                                            }
                                        }}
                                    >
                                        <List
                                            sx={{
                                                '&.MuiList-root': {
                                                    padding: '3px 3px',
                                                    '& .MuiListItem-root': {
                                                        cursor: 'pointer', padding: '5px 10px', alignItems: 'center',
                                                        '&:hover': { background: grey[300], borderRadius: 1.5, fontWeight:600, color: blueGrey[400] }
                                                    },
                                                    '& .MuiListItemText-root': { margin: '2px 0px' },
                                                    '& .MuiListItemIcon-root': { minWidth: '25px' },
                                                },
                                            }}
                                        >
                                            <ListItem onClick={handleClose}>Customer Service</ListItem>
                                            <ListItem onClick={handleClose}>Newsletter</ListItem>
                                            <ListItem onClick={handleClose}>Find a store</ListItem>
                                        </List>

                                    </Menu>
                                </Stack>
                        }
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4} display={'flex'} justifyContent={'center'}>
                        <Box component={'img'} src={WALMART} width={"180px"} height={"auto"} />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4} pr={3.5}>
                        <Stack direction={"row"} justifyContent={'flex-end'} alignItems={'flex-end'}>
                            <List sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 1, '&.MuiListItem-root': { paddingLeft: 0, width: '0px' }, '& .MuiListItemText-root': { minWidth: 'fit-content' } }}>
                                <ListItem>
                                    <ListItemIcon>
                                        <IconButton>
                                            <SlUser size={22} className='navbarIcon' />
                                        </IconButton>
                                    </ListItemIcon>
                                    <ListItemText sx={{ marginLeft: -1.5 }} primary={<StyledTypography>Sign In</StyledTypography>} secondary={<StyledTypography sx={{ fontWeight: 600 }}>Account</StyledTypography>} />
                                </ListItem>
                                <ListItem onClick={handleViewListOpen} sx={{cursor:'pointer'}}>
                                    <IconButton>
                                        <Badge color={`${wishList?.length > 0 && 'error'}`} variant='dot' overlap='circular'>
                                            <IoMdHeartEmpty size={22} className='navbarIcon' />
                                        </Badge>
                                    </IconButton>
                                    <ListItemText primary={<StyledTypography>Reorder</StyledTypography>} secondary={<StyledTypography sx={{ fontWeight: 600 }}>My Items</StyledTypography>} />
                                </ListItem>
                                <Link to={'/checkout'} style={{ textDecoration: 'none' }}>
                                    <ListItem>
                                        <IconButton aria-label="cart">
                                            <StyledBadge className='cart' badgeContent={cart?.length} color="secondary">
                                                <LiaShoppingBagSolid size={22} className='navbarIcon' />
                                            </StyledBadge>
                                        </IconButton>
                                        <ListItemText primary={<StyledTypography>Cart</StyledTypography>} secondary={<StyledTypography sx={{ fontWeight: 600 }}>{total}</StyledTypography>} />
                                    </ListItem>
                                </Link>
                            </List>
                        </Stack>
                    </Grid>
                    <WishList open={viewList} onClose={handleViewListClose} onClick={handleViewListOpen} anchorEl={viewWishList} />
                    {
                        visible &&
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            {location.pathname === '/' &&
                                <Stack direction={'row'} gap={3} justifyContent={'center'} alignItems={'center'} sx={{ background: orange[600] }}>
                                    {
                                        topMenu.map((item, key) => (
                                            <Box component={NavLink} to={`${item.link}`} sx={{ textDecoration: 'none', fontWeight: 600, color: blueGrey[800], padding: '2px 5px', '&:hover': { background: blue[800], color: grey[50] } }} key={key}>{item.name}</Box>
                                        ))
                                    }
                                </Stack>
                            }
                        </Grid>
                    }
                    {
                        visible &&
                        <Grid item lg={12} md={12} sm={12} xs={12} mt={3} display={'flex'} justifyContent={'flex-end'} mb={3} pr={5}>
                            <StyledSearchBar
                                value={search}
                                type='text'
                                placeholder='Seach...'
                                endAdornment={
                                    <InputAdornment position='end' sx={{ pr: 1 }}>
                                        <IconButton size='small' onClick={handleClick}><FiSearch size={20} /></IconButton>
                                    </InputAdornment>}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Grid>
                    }
                </Grid>
            </Toolbar>
        </StyledTopNav>
    );
}

export default TopNav