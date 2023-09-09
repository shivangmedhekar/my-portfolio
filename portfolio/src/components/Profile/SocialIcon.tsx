import React from 'react';

interface SocialsProps {
    src: string;
    alt: string;
    url: string;
}

const SocialIcon: React.FC <SocialsProps> = ({ src, alt, url }) => {
    return (
        <img
            src = {src}
            alt = {alt}
            className="icon"
            onClick={() => window.location.href = url}
        />
    );
}

export default SocialIcon;