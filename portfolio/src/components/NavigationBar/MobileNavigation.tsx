import React from 'react';

import NavLinks from './NavLinks';
import { HiOutlineMenu } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';

interface MobileNavigationProps {
    open: boolean;
    toggleMenu: () => void;
}


const MobileNavigation: React.FC <MobileNavigationProps> = ({ open, toggleMenu }) => {

    const hamburgerIcon = <HiOutlineMenu className='Hamburger' 
                                size='40px' color='black' 
                                onClick={toggleMenu}
                            />

    const closeIcon = <CgClose className='Hamburger' 
                                size='40px' color='black' 
                                onClick={toggleMenu}
                            />

    return (
        <div className='MobileNavigation'>
            {open ? closeIcon : hamburgerIcon}
            {open && <NavLinks />}
        </div>
    );
}

export default MobileNavigation;