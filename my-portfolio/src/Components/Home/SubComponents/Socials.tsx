import React from 'react';

import socialsData from '../../../Data/socialsData.json';

interface SocialIconProps {
    name: string;
    link: string;
    icon_classes: string[];
}

const SocialIcon: React.FC <SocialIconProps> = ({ name, link, icon_classes }) => {
    return(
        <a href={ link } target="_blank" className="home__social-icon">
            <i className={ icon_classes.join(' ') }></i>
        </a>
    );
}

const Socials: React.FC = () => {
    return(
        <div className="home__social">
            {socialsData.homeSocials.map((item) => (
                <SocialIcon name={item.name} link={item.link} icon_classes={ item.classNames }/>
            ))}
        </div>
    );
}

export default Socials;