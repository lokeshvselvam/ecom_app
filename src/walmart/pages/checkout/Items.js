import { Box, IconButton, Stack, useTheme, Grid, Divider, FormControl, MenuItem, InputLabel, Dialog, DialogContent, DialogActions, Button } from "@mui/material"
import { StyledSelect, StyledTypography } from "../../utlities/StyledComponent"
import { blue, blueGrey, green, grey } from "@mui/material/colors";
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart, qntIncrease, removeFromCart } from "../../service/slice";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi";

export const Items = ({productData, totalPrice}) => {

  const theme = useTheme();
  const {cart} = useSelector((state) => state.procuctAction);
  const [confirm, setConfirm] = useState(false);
  const handleOpen = () => setConfirm(true);
  const handleClose = () => setConfirm(false);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    emptyAllItemsInCart();
    handleClose();
  }

  const emptyAllItemsInCart = () => {
    dispatch(emptyCart());
  }

  return (
    <Box sx={{ background: '#ffff', width: 'auto', height: 'auto', }}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{padding: '15px 15px' }}>
        <StyledTypography variant="h6" sx={{ fontWeight: 600 }}>Items in Cart</StyledTypography>
        <IconButton onClick={handleOpen} size="small" sx={{ padding: .7, border: '.5px solid', borderColor: blueGrey[800], borderRadius: '50%' }}><HiOutlineTrash size={28} /></IconButton>
      </Stack>
      <Dialog open={confirm} onClose={handleClose} maxWidth='xs'>
        <header style={{margin: '14px 20px 0px 20px'}}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
            <StyledTypography variant="h6" sx={{ fontWeight: 600 }}>Remove Items</StyledTypography>
            <IconButton size="small" onClick={handleClose}><IoCloseSharp size={25} /></IconButton>
          </Stack>
        </header>
        <DialogContent sx={{mt:-2}}>
          <StyledTypography variant="body1">Are you sure you want to remove all the items from cart?</StyledTypography>
        </DialogContent>
        <DialogActions sx={{mb:2, mr:2}}>
          <Button onClick={handleConfirm} disableElevation sx={{borderRadius:0, textTransform:'capitalize', border:'2px solid', fontWeight:600, color:blue[900], borderColor:blue[900], '&:hover':{border:'2px solid'}}} variant="outlined">Remove</Button>
          <Button onClick={handleClose} disableElevation sx={{background:blue[900], borderRadius:0, textTransform:'capitalize', fontWeight:600}} variant="contained" startIcon={<IoMdHeartEmpty size={22} />}>Move to Wichlist</Button>
        </DialogActions>
      </Dialog>
      <Divider sx={{ borderColor: theme.palette.divider }} />
      <Box sx={{ padding: 3, my:-2 }}>
        {
          productData !== null && productData?.map((item, index) => {
            return (
              <Box key={index} sx={{ width: 'auto', height: 'auto', padding: 0, my:3.5}}>
                <Grid container spacing={2} marginBottom={1.5}>
                  <Grid item lg={3}>
                    <ProductImage data={item} />
                  </Grid>
                  <Grid item lg={8.5}>
                    <ProductInfo data={item} />
                  </Grid>
                </Grid>
                <Divider sx={{ borderColor: theme.palette.divider }} />
              </Box>
            )
          })
        }
      </Box>
    </Box>
  )
}

export const ProductImage = ({data}) => {
  return <Box component={'img'} src={data?.goods_img || data?.info?.goods_img} sx={{width: '100%', height: '180px', objectFit: 'cover'}} />
}

export const ProductIncrease = (props) => {

  const {data} = props;
  const dispatch = useDispatch();
  const [selectSize, setSelectSize] = useState(null);
  const theme = useTheme();
  const productSale = data?.is_on_sale || data?.info?.is_on_sale;
  const productSize = data?.info?.multiLevelSaleAttribute?.skc_sale_attr[0]?.attr_value_list;

  const handleIncrease = (e) => {
    const id = data?.goods_id || data?.info?.goods_id;
    const items = e.target.value;
    dispatch(qntIncrease({id, items}));
    // console.log(data?.is_on_sale || data?.info?.is_on_sale)
  }

  const handleSize = (index) =>selectSize(index);

  return (
    <Box sx={{display: 'flex', justifyContent:'flex-start', alignItems:'center', flexDirection:'row', gap:2}}>
      {
        productSize?.length > 0 &&
        <FormControl>
          <InputLabel sx={{background: grey[200], padding: '0px 8px', borderRadius: 2, fontWeight: 600, fontSize: 15}}>Size</InputLabel>
          <StyledSelect
            defaultValue={0}
            MenuProps={{
              PaperProps:{
                style:{
                  height:productSize?.length > 5 ? '180px' : 'auto',
                  marginTop:3,
                  borderRadius:6
                }
              }
            }}
          >
            <MenuItem value={0}>0</MenuItem>
            {
              productSize !== null && productSize?.map((item, index) => {
                return <MenuItem key={index} value={item?.attr_value_name}>{item?.attr_value_name}</MenuItem>
              })
            }
          </StyledSelect>
        </FormControl>
      }

      <FormControl>
      <InputLabel sx={{background: grey[200], padding: '0px 8px', borderRadius: 2, fontWeight: 600, fontSize: 15}}>
          Qty
        </InputLabel>
        <StyledSelect 
          value={data?.is_on_sale || data?.info?.is_on_sale}
          onChange={handleIncrease} 
          variant="outlined" 
          size='small'
          MenuProps={{
            PaperProps: {
              style: {
                height: '180px',
                marginTop: 3,
                borderRadius: 6,
              }
            }
          }}
          inputProps={{
            
          }}
        >
          {
            Array.from({length: data?.goods_id?.slice(0, 2) || data?.info?.goods_id?.slice(0, 2)}, (_, index) => index +1).map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>
            })
          }
        </StyledSelect>
      </FormControl>
    </Box>
  )
}

export const ProductInfo = ({data}) => {

  const productBrandName = data?.info?.premiumFlagNew?.brandName || data?.premiumFlagNew?.brandName;
  const productName = data?.goods_name || data?.info?.goods_name;
  const productSalePrice = data?.info?.sale_price?.amount || data?.salePrice?.amount;
  const productSale = data?.is_on_sale || data?.info?.is_on_sale;
  const productRetailPrice = data?.info?.retail_price?.amount || data?.retailPrice?.amount;
  const productDiscountPrice = data?.info?.discountPrice?.amount || data?.discountPrice?.amount;
  const productReff = data?.goods_id || data?.info?.goods_id;
  const stock = data?.goods_id?.slice(0, 2) || data?.info?.goods_id?.slice(0, 2);

  const dispatch = useDispatch();
  const handleRemove = (data) => {
    dispatch(removeFromCart(data));
  }
  console.log()

  return (
    <Box sx={{padding: '20px 8px', position: 'relative'}}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
        <Stack>
          <StyledTypography variant="body1" sx={{ fontWeight: 600 }}>{productBrandName}</StyledTypography>
          <StyledTypography variant="body2">{productName}</StyledTypography>
          <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'baseline'} gap={1.3} py={1}>
            <StyledTypography variant="body1" sx={{ fontWeight: 600 }}><span style={{fontSize: 12}}>{productSale >= 2 && productSale + 'x' + ' '}</span>₹{productSale * productSalePrice}</StyledTypography>
            {
              productSalePrice < productRetailPrice &&
              <>
                <StyledTypography variant="body2" sx={{ color: grey[600], fontSize: 14 }}>MRP: <span style={{ textDecoration: 'line-through' }}>₹{productSale * productRetailPrice}</span></StyledTypography>
                <StyledTypography variant="body2" sx={{ fontWeight: 600, color: green[500] }}>You save ₹{productSale * productDiscountPrice}</StyledTypography>
              </>
            }
          </Stack>
          <StyledTypography variant="body2" sx={{ color: grey[500] }}>Ref: {productReff}</StyledTypography>
          {/* <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'baseline'} gap={1.3}>
            <StyledTypography variant="body2" sx={{}}>Stock In:</StyledTypography>
            <Box sx={{ border: '.5px dashed', borderColor: blue[800], borderRadius: 2, padding: '0px 10px' }}>
              <StyledTypography variant="body2" sx={{ fontWeight: 500 }}>{stock} left</StyledTypography>
            </Box>
          </Stack> */}
          <Box sx={{position: 'absolute', bottom: 30, right: 10}}>
            <ProductIncrease data={data} />
          </Box>
          <StyledTypography variant="body2" sx={{color: grey[600]}}>Delivery by 04th Sep 2024</StyledTypography>
        </Stack>
        <IconButton size="small" onClick={() => handleRemove(data)} sx={{ padding: .7, border: '.5px solid', borderColor: blueGrey[800], borderRadius: '50%' }}><HiOutlineTrash size={20} /></IconButton>
      </Stack>
    </Box>
  )
}