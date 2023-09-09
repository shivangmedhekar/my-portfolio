import React from 'react';

import profilePic from '../../assets/IMG_8725-modified.png';

const ProfilePicture: React.FC = () => {
    
    return(
        <div className="section__pic-container">
            <img src={profilePic} alt="Shivang Medhekar Profile Picture" />
        </div>
    );
}

export default ProfilePicture;