import React, { useState } from 'react';

import { Drawer } from 'antd'; 
import { MenuOutlined } from '@ant-design/icons';
import NavLinks from './NavLinks';

const MobileNav: React.FC = () => {

    const [mobileNav, setMobileNav] = useState(false); // State managed in the Navigation component

    const closeMenu = () => {
        setMobileNav(false);
    };

    return (
        <div className='mobile-nav'>

            <div className='menuIcon'>
                <MenuOutlined onClick={() => {setMobileNav(true)}}/>
            </div>

            <Drawer 
                open = {mobileNav}
                onClose={closeMenu}
                closable={false} 
            >
                <NavLinks isInline/>
            </Drawer>

        </div>
    );
}

export default MobileNav;