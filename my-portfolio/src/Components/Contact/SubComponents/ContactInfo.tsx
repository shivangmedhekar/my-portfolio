import React from 'react';

interface ContactInfoProps {
    contact_no: string;
    email: string;
    location: string;
}

const ContactInfo: React.FC <ContactInfoProps> = ({ contact_no, email, location }) => {
    return(
        <div>
          <div className="contact__information">
            <i className="uil uil-phone contact__icon"></i>
            <div>
              <h3 className="contact__title">Call Me</h3>
              <span className="contact__subtitle">{ contact_no }</span>
            </div>
          </div>

          <div className="contact__information">
            <i className="uil uil-envelope contact__icon"></i>
            <div>
              <h3 className="contact__title">Email</h3>
              <span className="contact__subtitle">{ email }</span>
            </div>
          </div>

          <div className="contact__information">
            <i className="uil uil-map-marker contact__icon"></i>
            <div>
              <h3 className="contact__title">Location</h3>
              <span className="contact__subtitle">{ location }</span>
            </div>
          </div>
        </div>
    );
}

export default ContactInfo;