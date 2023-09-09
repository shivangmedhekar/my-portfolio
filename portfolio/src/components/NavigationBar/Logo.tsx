import React from 'react';

interface LogoProps {
    name: string;
}

const Logo: React.FC <LogoProps> = ({ name }) => {

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return(
        <div className='logo'>
        <a href="#" onClick={scrollTop}>
            { name }
            </a>
        </div>
    );
}

export default Logo;