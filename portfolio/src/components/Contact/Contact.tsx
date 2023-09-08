import React from 'react';



import EmailICON from '../../assets/email.png';
import LinkedICON from '../../assets/linkedin.png';

import './Contact.css';

const Contact: React.FC = () => {
    return (
        <section id="contact">
            <p className="section__text__p1">Get in Touch</p>
            <h1 className="title">Contact Me</h1>
            <div className="contact-info-upper-container">
                <div className="contact-info-container">
                <img
                    src={EmailICON}
                    alt="Email icon"
                    className="icon contact-icon email-icon"
                />
                <p>
                    <a href="mailto:examplemail@gmail.com">examplemail@gmail.com</a>
                </p>
                </div>
                <div className="contact-info-container">
                <img
                    src={LinkedICON}
                    alt="LinkedIn icon"
                    className="icon contact-icon"
                />
                <p>
                    <a href="https://www.linkedin.com">LinkedIn</a>
                </p>
                </div>
            </div>
        </section>
    )
}

export default Contact;