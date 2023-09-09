import React from 'react';

import { Row, Col } from 'antd';

import AboutPicture from './SubComponents/AboutPicture';
import AboutBlocks from './SubComponents/AboutBlocks';

import ExperiencePNG from '../../assets/experience.png';
import EducationPNG from '../../assets/education.png';
import ArrowICON from '../../assets/arrow.png';


import './About.css';

const About: React.FC = () => {
    return (
        <section id="about">
            <p className="section__text__p1">Get To Know More</p>
            <h1 className="title">About Me</h1>

            <div className="section-container">

                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={9}>
                        <AboutPicture />
                    </Col>

                    <Col xs={0} sm={0} md={0} lg={0} xl={2}></Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={13}>

                        <div className="about-details-container">

                            <AboutBlocks />
    
                            <div className="text-container">
                                <p>
                                    I am a Masters student in Computer Science at Stevens Institute of Technology, 
                                    set to graduate in December 2023. I have a strong foundation in coding fundamentals and a 
                                    track record of high-quality engineering. I have experience in web development and 
                                    cloud computing. My technical skills include proficiency in Python, JavaScript, Java, 
                                    and C++, as well as experience with web frameworks such as Node.js, Express.js, React, 
                                    MongoDB, and AWS. I have also completed several academic projects that demonstrate my 
                                    ability to work in a team and to translate real-world problems into elegant code solutions. 
                                    These projects include building a music playback app, a movie booking app and an ecommerce 
                                    web app. I also have experience in machine learning, computer vision and data analysis. 
                                    I am actively seeking software development engineer roles and am excited to bring my 
                                    skills and experience to a new team.
                                </p>
                            </div>

                        </div>

                    </Col>
                </Row>

            </div>
            <img
                src={ArrowICON}
                alt="Arrow icon"
                className="icon arrow"
                onClick={() => window.location.href = './#experience'}
            />
        </section>
    )
}

export default About;