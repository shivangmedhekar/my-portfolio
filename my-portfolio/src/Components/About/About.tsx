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
                    <p className="about__description">Web developer, with extensive knowledge and years of 
                        experience, working in web technologies and Ui / Ux design, delivering quality work.
                    </p>

                    <div className="about__info">
                        <div>
                            <span className="about__info-title">08+</span>
                            <span className="about__info-name">Years <br /> experience</span>
                        </div>

                        <div>
                            <span className="about__info-title">20+</span>
                            <span className="about__info-name">Completed <br /> projects</span>
                        </div>

                        <div>
                            <span className="about__info-title">05+</span>
                            <span className="about__info-name">Companies <br /> worked</span>
                        </div>
                    </div>

                    <DownloadCVButton />
                    
                </div>
            </div>
        </section>

    );
}

export default About;