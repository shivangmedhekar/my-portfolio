import React from 'react';

interface DownloadCVButtonProps {
    location: string;
}

const DownloadCVButton = () => {
    return (
        <div className="about__buttons">
            {/* Change your CV */}
            <a href="assets/pdf/Alexa-Cv.pdf" target="_blank" className="button button--flex">
                Download CV <i className="uil uil-download-alt button__icon"></i>
            </a>
        </div>
    );
}

const About: React.FC = () => {

    return(
        <section className="about section" id="about">
            <h2 className="section__title">About Me</h2>
            <span className="section__subtitle">My introduction</span>

            <div className="about__container container grid">
                <img src="assets/img/about.jpg" alt="" className="about__img" />

                <div className="about__data">
                    <p className="about__description">I'm a Computer Science Masters student with strong coding skills, 
                    specializing in web development, cloud computing, and machine learning, 
                    actively seeking software engineering roles.
                    </p>

                    <div className="about__info">
                        <div>
                            <span className="about__info-title">2</span>
                            <span className="about__info-name">Internships</span>
                        </div>

                        <div>
                            <span className="about__info-title">10+</span>
                            <span className="about__info-name">Completed <br /> projects</span>
                        </div>

                        <div>
                            <span className="about__info-title">20+</span>
                            <span className="about__info-name">Tech <br /> Skills</span>
                        </div>
                    </div>

                    <DownloadCVButton />
                    
                </div>
            </div>
        </section>

    );
}

export default About;