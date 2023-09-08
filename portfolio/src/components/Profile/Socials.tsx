import React from 'react';



import LinkedInLogo from '../../assets/linkedin.png';
import GitHubLogo from '../../assets/github.png';

import './Profile.css';

interface SocialsProps {
    src: string;
    alt: string;
    url: string;
}


const Socials: React.FC<SocialsProps> = ({ src, alt, url}) => {
    return (
        <img
            src = {src}
            alt = {alt}
            className="icon"
            onClick={() => window.location.href = url}
        />
    );
}

export default Socials;