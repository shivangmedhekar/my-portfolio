import React from 'react';

import { Row, Col } from 'antd';

import ProfileIntro from './ProfileIntro';
import ProfilePicture from './ProfilePicture';

import './Profile.css';

const Profile: React.FC = () => {
    return (
        <section id="profile">

            <Row gutter={[64, 16]}>

                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <ProfilePicture />
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <ProfileIntro />
                </Col>
                
            </Row>
        </section>
    )
}

export default Profile;