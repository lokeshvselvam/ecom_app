import { IconButton, Stack, useTheme } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowUp } from 'react-icons/md';

const ScrollTop = () => {

    const [visible, setVisible] = useState(false);
    const theme = useTheme();

    const handleScroll = () => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); };

    const scrollCheck = () => {
        let height = 50;
        let bodyCheck = document.body.scrollTop || document.documentElement.scrollTop;
        if (bodyCheck > height) {
            setVisible(!visible);
        } else {
            setVisible(visible)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollCheck);
    }, []);

    return (
        <>
            {visible &&
                <IconButton sx={{background: blueGrey[800], position: 'fixed', right: 10, bottom: 10, zIndex: 200 }}>
                    <MdKeyboardArrowUp size={28} style={{color: grey[50]}} onClick={handleScroll} />
                </IconButton>
            }
        </>
    )
}

export default ScrollTop