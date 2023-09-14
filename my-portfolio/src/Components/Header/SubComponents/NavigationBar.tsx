import React, { useState } from 'react';

import Logo from './Logo';
import NavLink from './NavLink';
import MobileNavigation from './MobileNavigation';
import ScrollActive from './ScrollActive';

const NavigationBar: React.FC = () => {

    const [menu, setMenu] = useState(false);

    const openMenu = () => {
        setMenu(true);
    }

    const closeMenu = () => {
        setMenu(false);
    }

    interface NavItem {
        section: string;
        icon_classes: string[];
    };

    const navItems:NavItem[] = [
        { section: 'Home', icon_classes: ['uil', 'uil-estate'] },
        { section: 'About', icon_classes: ['uil', 'uil-user'] },
        { section: 'Skills', icon_classes: ['uil', 'uil-file-alt'] },
        { section: 'Qualifications', icon_classes: ['uil', 'uil-briefcase-alt'] },
        { section: 'Portfolio', icon_classes: ['uil', 'uil-scenery'] },
        { section: 'Contact', icon_classes: ['uil', 'uil-message'] }
    ];

    return(
        <nav className="nav container">
            
            <Logo name='Shivang Medhekar'/>

            <div className={`nav__menu ${menu ? 'show-menu' : ''}`} id="nav-menu">
                <ul className="nav__list grid">

                    {navItems.map((item => (
                        <NavLink section={item.section} icon_classes={item.icon_classes}/>
                    )))}
                                        
                </ul>
                
                {/* Close Button */}
                <i className="uil uil-times nav__close" id="nav-close" onClick={closeMenu}></i>
            </div>

            <MobileNavigation onClickHandler ={openMenu}/>
            {/* <ScrollActive /> */}
        </nav>
    );
}



export default NavigationBar;