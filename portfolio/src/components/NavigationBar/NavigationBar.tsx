import React, { useState } from 'react';

import { Row, Col } from 'antd'; 

import Logo from './Logo';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

import './NavigationBar.css' // CSS File


function NavigationBar() {

    return (
        <div className='nav-bar'>
            <Row>
                <Col span={14}> 
                    <Logo name='Shivang Medhekar' />
                </Col>

                <Col span={10}>
                    <DesktopNav />
                    <MobileNav />
                </Col>
            </Row>
        </div>  
    );
}

export default NavigationBar;