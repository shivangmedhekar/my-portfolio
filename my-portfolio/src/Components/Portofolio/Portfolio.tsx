import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';

import Project from './SubComponents/Project';
import PorjectsData from './SubComponents/ProjectsData';

import 'swiper/swiper-bundle.css';

const Portfolio = () => {
  useEffect(() => {
    // Initialize Swiper here
    let swiperPortfolio = new Swiper('.portfolio__container', {
      cssMode: true,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }, []); // Empty dependency array to run this effect only once after mounting

  return (
    <section className="portfolio section" id="portfolio">
      <h2 className="section__title">Portfolio</h2>
      <span className="section__subtitle">Most recent work</span>

      <div className="portfolio__container container swiper-container">
        <div className="swiper-wrapper">
          
          {PorjectsData.map((project => (
            <Project title={project.title} description={project.description}/>
          )))}
          
        </div>

        <div className="swiper-button-next">
          <i className="uil uil-angle-right-b swiper-portfolio-icon"></i>
        </div>
        <div className="swiper-button-prev">
          <i className="uil uil-angle-left-b swiper-portfolio-icon"></i>
        </div>

        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};

export default Portfolio;
