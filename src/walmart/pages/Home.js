import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TopNav from './TopNav'
import Product from './Product'
import ProductSuccess from '../utlities/ProductSuccess'
import { useDispatch, useSelector } from 'react-redux'
import { productSuccessToast } from '../service/slice'
import Footer from './footer/Footer'

const Home = () => {

  const [visible, setVisible] = useState(false);
  const {successToast, cart} = useSelector((state) => state.procuctAction);
  const dispatch = useDispatch();

  const toastMsg = () => {
    if(successToast){
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        dispatch(productSuccessToast(null));
      }, 2000);
    }
  }
  
  useEffect(() => {
    toastMsg();
  }, [successToast]);

  return (
    <Box>
        <TopNav />
        <Product />
        <Footer />
        {
          visible && <ProductSuccess />
        }
    </Box>
  )
}

export default Home