import React from 'react';

interface ProjectProps {
    title: string;
    description: string;
}

const Project: React.FC <ProjectProps> = ( { title, description }) => {
    return(
        <div className="portfolio__content grid swiper-slide">
            <img src="assets/img/portfolio1.jpg" alt="" className="portfolio__img" />

            <div className="portfolio__data">
                <h3 className="portfolio__title">{title}</h3>
                <p className="portfolio__description">{description}</p>
                <a href="#" className="button button--flex button--small portfolio__button">
                Demo
                <i className="uil uil-arrow-right button__icon"></i>
                </a>
            </div>
        </div>
    );
}

export default Project;