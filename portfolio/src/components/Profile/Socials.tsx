import React from 'react';

import SocialIcon from './SocialIcon';

import LinkedInLogo from '../../assets/linkedin.png';
import GitHubLogo from '../../assets/github.png';


const Socials: React.FC = () => {

  interface SocialIconData {
    src: string;
    alt: string;
    url: string;
  }

  const socialIconsData: SocialIconData[] = [
      {
        src: LinkedInLogo,
        alt: 'My LinkedIn profile',
        url: 'https://www.linkedin.com/in/shivangmedhekar/',
      },
      {
        src: GitHubLogo,
        alt: 'My GitHub profile',
        url: 'https://github.com/shivangmedhekar',
      },
      // Add more objects for additional social icons
    ];

  const socialIcons = socialIconsData.map((data, index) => (
      <SocialIcon
          key={index}
          src={data.src}
          alt={data.alt}
          url={data.url}
      />
  ));


  return(
      <div id="socials-container">
          {socialIcons}
      </div>
  );
}

export default Socials;