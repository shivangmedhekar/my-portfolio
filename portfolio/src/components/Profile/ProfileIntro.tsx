import React from 'react';

import ProfileButtons from './ProfileButtons';
import Designations from './Designations';
import Socials from './Socials';




const ProfileIntro: React.FC = () => {

    return(
        <div className="section__text">

            <p className="section__text__p1">Hello, I'm</p>
            <h1 className="title">Shivang Medhekar</h1>

            <Designations />

            <ProfileButtons />
            <Socials />
            
        </div>
    );
}

export default ProfileIntro;