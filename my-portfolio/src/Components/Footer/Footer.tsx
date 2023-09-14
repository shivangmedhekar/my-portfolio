import React from 'react';
import Designations from '../Designations/Designations';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__bg">
        <div className="footer__container container grid">
          <div>
            <h1 className="footer__title">Shivang Medhekar</h1>
            <span className="footer__subtitle"><Designations class_name='footer__subtitle'/></span>
          </div>

          <ul className="footer__links">
            <li>
              <a href="#skills" className="footer__link">
                Skills
              </a>
            </li>
            <li>
              <a href="#portfolio" className="footer__link">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" className="footer__link">
                Contact
              </a>
            </li>
          </ul>

          <div className="footer__socials">
            <a href="https://www.facebook.com/smedhekar900/" target="_blank" className="footer__social">
              <i className="uil uil-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/shivang_medhekar/" target="_blank" className="footer__social">
              <i className="uil uil-instagram"></i>
            </a>
            <a href="https://twitter.com/ShivangMedhekar" target="_blank" className="footer__social">
              <i className="uil uil-twitter-alt"></i>
            </a>
          </div>
        </div>

        <p className="footer__copy">&#169; Shivang Medhekar. All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
