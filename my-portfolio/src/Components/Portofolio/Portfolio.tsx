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
    <div>
      <section className="portfolio section" id="portfolio">
      <h2 className="section__title">Portfolio</h2>
      <span className="section__subtitle">Most recent work</span>

      <div className="portfolio__container container swiper-container">
        <div className="swiper-wrapper">
          
          {PorjectsData.map((project => (
            <Project title={project.title} image={project.image} github={project.github} description={project.description}/>
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

    {/* <Test/> */}
    </div>
  );
};

export default Portfolio;

const Test = () => {

  
  return(
    <section className="work section" id="work">
      <span className="section__subtitle">My Portfolio</span>
      <h2 className="section__title">Recent Works</h2>

      <div className="work__filters">
        <span className="work__item active-work" data-filter="all">
          All
        </span>
        <span className="work__item" data-filter=".web">
          Web
        </span>
        <span className="work__item" data-filter=".movil">
          Movil
        </span>
        <span className="work__item" data-filter=".design">
          Design
        </span>
      </div>

      <div className="work__container container grid">
        <div className="work__card mix web">
          <img src="assets/img/work1.jpg" alt="" className="work__img" />

          <h3 className="work__title">Web design</h3>

          <a href="" className="work__button">
            Demo <i className="bx bx-right-arrow-alt work__icon"></i>
          </a>
        </div>

        <div className="work__card mix movil">
          <img src="assets/img/work2.jpg" alt="" className="work__img" />

          <h3 className="work__title">App movil</h3>

          <a href="" className="work__button">
            Demo <i className="bx bx-right-arrow-alt work__icon"></i>
          </a>
        </div>

        <div className="work__card mix design">
          <img src="assets/img/lol.jpg" alt="" className="work__img" />

          <h3 className="work__title">Brand design</h3>

          <a href="" className="work__button">
            Demo <i className="bx bx-right-arrow-alt work__icon"></i>
          </a>
        </div>

        <div className="work__card mix web">
          <img src="assets/img/work4.jpg" alt="" className="work__img" />

          <h3 className="work__title">Web design</h3>

          <a href="" className="work__button">
            Demo <i className="bx bx-right-arrow-alt work__icon"></i>
          </a>
        </div>

        <div className="work__card mix movil">
          <img src="assets/img/work5.jpg" alt="" className="work__img" />

          <h3 className="work__title">App movil</h3>

          <a href="" className="work__button">
            Demo <i className="bx bx-right-arrow-alt work__icon"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

