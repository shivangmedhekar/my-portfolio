import React from 'react';

interface LogoProps {
    name: string;
}

const Logo: React.FC <LogoProps> = ({ name }) => {
    return(
        <a href="#" className="nav__logo">{ name }</a>
    );
}

export default Logo;