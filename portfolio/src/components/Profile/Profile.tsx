import React from 'react';

import { Typewriter } from 'react-simple-typewriter';

import Socials from './Socials';


import profilePic from '../../assets/IMG_8725-modified.png';
import LinkedInLogo from '../../assets/linkedin.png';
import GitHubLogo from '../../assets/github.png';

import './Profile.css';

const Profile: React.FC = () => {
    return (
        <section id="profile">

            <div className="section__pic-container">
                <img src={profilePic} alt="Shivang Medhekar Profile Picture" />
            </div>

            <div className="section__text">
                <p className="section__text__p1">Hello, I'm</p>
                <h1 className="title">Shivang Medhekar</h1>
                <p className="section__text__p2">
                    <Typewriter 
                        words={['CS Gradute Student','Software Engineer', 'Developer', 'Dev Ops']}
                        loop={100}
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                    
                    
                </p>

                <div className="btn-container">
                    <button
                        className="btn btn-color-2"
                        onClick={() => window.open('../../assets/resume-example.pdf')}
                    >
                        Download CV
                    </button>
                    <button className="btn btn-color-1" onClick={() => window.location.href = './#contact'}>
                        Contact Info
                    </button>
                </div>

                <div id="socials-container">
                    <Socials 
                        src = {LinkedInLogo}
                        alt = 'My LinkedIn profile'
                        url = 'https://www.linkedin.com/in/shivangmedhekar/'
                    />
                    <Socials 
                        src = {GitHubLogo}
                        alt = 'My GitHub profile'
                        url = 'https://github.com/shivangmedhekar'
                    />
                </div>
                
            </div>
        </section>
    )
}

export default Profile;