import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack, Grid, Container } from '@mui/material'
import TopNav from '../TopNav';
import { useGetProductByIdQuery } from '../../service/ServiceCall';
import Image from './Image';
import Details from './Details';
import ImgNav from './ImgNav';
import SimilarProducts from './SimilarProducts';
import { useDispatch, useSelector } from 'react-redux';
import { productSuccessToast } from '../../service/slice';
import ProductSuccess from '../../utlities/ProductSuccess';
import Footer from '../footer/Footer';

const ProductDetails = () => {

    const { goods_id } = useParams();
    const dispatch = useDispatch();
    const productId = goods_id;
    const { data: productData, isLoading, isFetching } = useGetProductByIdQuery(productId);
    const {successToast} = useSelector((state) => state.procuctAction);
    // console.log(productData)

    //Product Data:
    const imageGallery = productData?.info?.nowater_gallery?.detail_image[0]?.origin_image;

    //state
    const [image, setImage] = useState(imageGallery);
    const [select, setSelect] = useState(0);
    const [visible, setVisible] = useState(false);
  
    const handleImageChange = (img, key) => {
        setImage(img);
        setSelect(key);
    };

    const toastMsg = () => {
        if(successToast){
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
            dispatch(productSuccessToast(null));
          }, 2000);
        }
      };

    useEffect(() => {
        setImage(imageGallery);
    }, [imageGallery]);

    useEffect(() => {
        toastMsg();
      }, [successToast]);

    return (
        <Stack>
            <TopNav title={productData?.info?.cate_name} id={productId} />
            <Box sx={{ background: '', height: 'auto', marginTop: '200px', marginLeft: 6, marginRight: 6 }}>
               {/* <Container sx={{}}> */}
                <Grid container spacing={2} marginBottom={7}>
                    <Grid item lg={1} md={1} sm={1}>
                        <ImgNav image={image} select={select} setImage={setImage} handleImageChange={handleImageChange} productData={productData} isFetching={isFetching} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={5} md={5} sm={5}>
                        <Image image={image} setImage={setImage} productData={productData} isFetching={isFetching} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                        <Details productData={productData} isFetching={isFetching} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} mt={5}>
                        <SimilarProducts catId={productData?.info?.cat_id} goodsId={productId} />
                    </Grid>
                </Grid>
               {/* </Container> */}
                {
                    visible && <ProductSuccess />
                }
            </Box>
            <Box>
            <Footer />
            </Box>
        </Stack>
    )
}

export default ProductDetails