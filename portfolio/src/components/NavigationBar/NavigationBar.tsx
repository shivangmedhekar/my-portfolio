import React, { useState } from 'react';

import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import './NavigationBar.css' // CSS File

function NavigationBar() {

    const [open, setOpen] = useState(false); // State managed in the Navigation component

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <nav id="desktop-nav">
            <div className='logo'>Shivang Medhekar</div>
            <Navigation />
            <MobileNavigation open={open} toggleMenu={toggleMenu} />
        </nav>
    );
}

export default NavigationBar;