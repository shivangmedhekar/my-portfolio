import React from 'react';

const socialLinks = [
    {
        link: 'https://www.linkedin.com/',
        classNames: ['uil', 'uil-linkedin-alt']
    },
    {
        link: 'https://dribbble.com/',
        classNames: ['uil', 'uil-dribbble']
    },
    {
        link: 'https://github.com/',
        classNames: ['uil', 'uil-github-alt']
    }
];

interface SocialIconProps {
    link: string;
    icon_classes: string[];
}

const SocialIcon: React.FC <SocialIconProps> = ({ link, icon_classes }) => {
    return(
        <a href={ link } target="_blank" className="home__social-icon">
            <i className={ icon_classes.join(' ') }></i>
        </a>
    );
}

const Socials: React.FC = () => {
    return(
        <div className="home__social">

            {socialLinks.map((item) => (
                <SocialIcon link={item.link} icon_classes={ item.classNames }/>
            ))}

        </div>
    );
}

export default Socials;