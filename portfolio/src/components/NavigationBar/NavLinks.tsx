import React from 'react';
import { Menu } from 'antd';

const menuItems = [
    { label: 'Home', key: 'profile' },
    { label: 'About', key: 'about' },
    { label: 'Experience', key: 'experience' },
    { label: 'Projects', key: 'projects' },
    { label: 'Contact', key: 'contact' },
  ];

interface NavLinksProps {
    isInline?: boolean; // Add the isInline prop
}

const NavLinks: React.FC <NavLinksProps> = ({ isInline = false }) => {
    return (
        <div className='nav-links'>
            
                <Menu
                mode= {isInline ? "inline" : "horizontal"}
                >
                {menuItems.map((menuItem) => (
                    <Menu.Item key={menuItem.key} className="nav-link-item">
                    <a href={`#${menuItem.key}`}>{menuItem.label}</a>
                    </Menu.Item>
                ))}
                </Menu>
        </div>
    );
}

export default NavLinks;