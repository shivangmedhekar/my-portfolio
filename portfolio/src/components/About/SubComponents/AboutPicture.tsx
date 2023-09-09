import React from 'react';

import AboutPic from '../../../assets/profile-pic-3.png';

const AboutPicture: React.FC = () => {
    return(
        <div className="section__pic-container">
            <img
                src={AboutPic}
                alt="Profile picture"
                className="about-pic"
            />
        </div>
    );
}

export default AboutPicture;