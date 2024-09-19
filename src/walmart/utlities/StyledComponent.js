import { AppBar, Badge, Box, Button, Card, InputBase, Paper, Rating, Select, Tooltip, Typography, styled, tooltipClasses } from "@mui/material";
import { blue, blueGrey, grey, pink, red, yellow } from "@mui/material/colors";


export const StyledTopNav = styled(AppBar)(({ }) => ({
  backgroundColor: grey[100],
  boxShadow: 'none',
  '& .css-hyum1k-MuiToolbar-root':{
    padding: 0,
  }
}));

export const StyledProductCard = styled(Card)(({ }) => ({
  backgroundColor: blueGrey[50],
  boxShadow: 'none',
  borderRadius: 'none !important',
  width: 200,
  height: 385,
}));

export const StyledProductBox = styled(Box)(({ }) => ({
  width: 170,
  height: 'auto',
  overflow: 'hidden',
  position: 'relative',
  '&.imgHover': {
    width: 200,
    height: 'auto',
    overflow: 'hidden',
    "&:hover": {
      transform: "scale(1.1)",
      transition: "ease-in-out 1.1s",
    },
    '&.imgHover img': {
      width: 200,
      height: 240,
      objectFit: 'contain'
    },
  }
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: blueGrey[800],
  fontFamily: 'Trebuchet MS, sans-serif',
  [theme.breakpoints.down('xs')]: {
    fontSize: 10,
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: 8,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 6,
  },
  '&.prime': {
    color: blue[400],
    fontWeight: 600,
    fontSize: 10,
  },
  '&.discountPercentage': {
    color: red[800],
    fontSize: 19,
  },
  '&.currentPrice': {
    color: blueGrey[800],
    fontWeight: 600,
    fontSize: 23,
  },
}));

export const StyledSearchBar = styled(InputBase)(({ }) => ({
  width: '370px',
  padding: '7px 10px',
  backgroundColor: grey[300],
  color: blueGrey[800],
  // borderBottom: `1px solid ${blueGrey[500]}`,
  borderRadius: '20px',
  '& .MuiInputBase-input': {
    color: blueGrey[800],
    fontFamily: 'Trebuchet MS, sans-serif',
    paddingLeft: 15
  }
}))


export const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: blueGrey[900],
  },
  [`& .${tooltipClasses.tooltip}`]: {
    // backdropFilter: 'blur(10)',
    backgroundColor: blueGrey[900],
    width: 'fit-content',
    color: grey[100],
    fontFamily: 'Trebuchet MS, sans-serif',
    // borderTopLeftRadius: '13px 7px',
    // borderTopRightRadius: '13px 7px',
    // borderBottomLeftRadius: '13px 7px',
    // borderBottomRightRadius: '13px 7px',
    borderRadius: 9,
    padding: '5px 13px'
  },
}));

export const StyledRating = styled(Rating)(({ }) => ({
  // position: 'absolute',
  // top: 5,
  // right: 5,
  "& .MuiRating-iconEmpty": {
    color: grey[700],
  },
  "& .MuiRating-iconFilled": {
    color: yellow[800],
  },
  // "& .MuiRating-iconHover": {
  //   color: red[800],
  // },
}));

export const StyledButton = styled(Button)(({ }) => ({
  '& .MuiButtonBase-root': {

  },
  borderRadius: '0 !important',
  width: 'fit-content',
  height: 'auto',
  padding: '3px 30px',
  display: 'flex',
  alignItems: 'center',
  marginTop: 2,
  gap: 5,
  fontWeight: 600,
  textTransform: 'capitalize',
  fontFamily: 'Trebuchet MS, sans-serif',
  fontSize: 15,
  '&.add': {
    backgroundColor: red[800],
    color: grey[50],
    '&:hover': {
      backgroundColor: red[800],
      color: grey[50],
    }
  },
  '&.checkout': {
    backgroundColor: blueGrey[800],
    color: grey[50],
    '&:hover': {
      backgroundColor: blueGrey[800],
      color: grey[50],
    }
  },
  '&.wishList': {
    backgroundColor: grey[800],
    color: grey[50],
    '&:hover': {
      backgroundColor: grey[800],
      color: grey[50],
    }
  },
}));

export const StyledBadge = styled(Badge)(({ }) => ({
  '&.cart': {
    '& .MuiBadge-badge': {
      color: grey[100],
      backgroundColor: red[800],
      fontWeight: 600,
      fontFamily: 'Trebuchet MS, sans-serif',
      fontSize: 12,
      padding: '1px'
    },
    '& .MuiBadge-anchorOriginTopRight': {
      top: 2,
      right: 4
    }
  },
  '&.wishList': {
    color: red[800]
  }
}))

export const StyledProductCardWrapper = styled(Paper)(({ theme, view }) => ({
  height: 'auto',
  boxShadow: `0px 0px 6px ${grey[300]}`,
  overflow: 'hidden',
  background: theme.palette.background.paper,
  borderRadius: 0,
  '&:hover .productCardHover': {
    transform: 'translateY(-35px)'
  },
  '&:hover .productLike': {
    opacity: 100,
    zIndex: 100,
    transition: '.4s ease-in-out',
  },
  '&:hover .productView': {
    opacity: 100,
    zIndex: 100,
    transition: '.8s ease-in-out',
  },
}))

export const StyledSelect = styled(Select)(({ theme }) => ({
  '&.MuiOutlinedInput-root': {
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderColor: theme.palette.divider,
    padding: '17px 20px 12px 6px',
    fontSize: '12px',
    width: 'fit-content',
    fontWeight: 600,
    height: '30px',
    'em': {
      color: theme.palette.grey[400],
      fontWeight: 400,
      fontStyle: 'normal',
    },
  },
}))