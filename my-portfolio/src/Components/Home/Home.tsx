import React from 'react';

import Designations from '../Designations/Designations';

import Socials from './SubComponents/Socials';


const Home = () => {
    return (
        <section className="home section" id="home">
            <div className="home__container container grid">
                <div className="home__content grid">
                    
                <Socials />

                <div className="home__img">
                    <svg className="home__blob" viewBox="0 0 200 187">
                    <mask id="mask0" mask-type="alpha">
                        <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z" />
                    </mask>
                    <g mask="url(#mask0)">
                        <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z" />

                        {/*====================Insert your image in the Img folder and Change your image | 
                        Center your image with X: horizontal, Y: vertical ====================*/}
                        <image className="home__blob-img" x="-175" y="-130" href="assets/img/shivang.jpg" />
                    </g>
                    </svg>
                </div>

                <div className="home__data">
                    <h1 className="home__title">Hi, I'm Shivang</h1>
                    <Designations />
                    {/* <h3 className="home__subtitle">CS Gradute Student</h3> */}
                    <p className="home__description">Aspiring Software Engineer with strong coding skills, web dev experience, and project success, seeking SDE roles</p>

                    <a href="#contact" className="button button--flex">Contact Me <i className="uil uil-message button__icon"></i></a>
                </div>
                </div>

                <div className="home__scroll">
                <a href="#about" className="home__scroll-button button--flex">
                    <i className="uil uil-mouse-alt home__scroll-mouse"></i>
                    <span className="home__scroll-name">Scroll down</span>
                    <i className="uil uil-arrow-down home__scroll-arrow"></i>
                </a>
                </div>
            </div>
            </section>
    );
}

export default Home;