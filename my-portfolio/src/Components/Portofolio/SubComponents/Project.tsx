import React from 'react';

interface ProjectProps {
    title: string;
    image: string;
    github: string;
    description: string;
}

const Project: React.FC <ProjectProps> = ( { title, image, github, description }) => {
    return(
        <div className="portfolio__content grid swiper-slide">
            <img src={`assets/img/${image}`} alt="" className="portfolio__img" />

            <div className="portfolio__data">
                <h3 className="portfolio__title">{title}</h3>
                <p className="portfolio__description">{description}</p>
                <a href={github} className="button button--flex button--small portfolio__button" target='_blank'>
                    GitHub
                <i className="uil uil-github-alt button__icon"></i>
                </a>
                
            </div>
        </div>
    );
}

export default Project;