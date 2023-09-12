import React from 'react';

import ContactInfo from './SubComponents/ContactInfo';
import ContactForm from './SubComponents/ContactForm';

const Contact = () => {
  return (
    <section className="contact section" id="contact">
      <h2 className="section__title">Contact Me</h2>
      <span className="section__subtitle">Get in touch</span>

      <div className="contact__container container grid">
        
        <ContactInfo 
            contact_no='551-689-1874'
            email='smedheka@stevens.edu'
            location='Jersey City, NJ, United States'
            />
        <ContactForm />
        
      </div>
    </section>
  );
};

export default Contact;
