import React from 'react';

import ContactInfo from './SubComponents/ContactInfo';
import ContactForm from './SubComponents/ContactForm';
import contactData from '../../Data/contactData.json';

const Contact = () => {
  return (
    <section className="contact section" id="contact">
      <h2 className="section__title">Contact Me</h2>
      <span className="section__subtitle">Get in touch</span>

      <div className="contact__container container grid">
        
        <ContactInfo 
            contact_no= {contactData.phone_no}
            email= {contactData.email}
            location= {<div dangerouslySetInnerHTML={{ __html: contactData.location }} />
          }
        />
        {/* <ContactForm /> */}
        
      </div>
    </section>
  );
};

export default Contact;
