import React from 'react';

import INDFlag from '../../../assets/india.png';
import USFlag from '../../../assets/united-states.png';
import StevensLogo from '../../../assets/stevens-logo.png';
import MULogo from '../../../assets/mu-logo.png';


const AboutBlocks = () => {
    return(
        <div className="about-containers">

            <div className="details-container-multi">
                <div className="details-container">

                <div className='current-location'>
                        <img className='flag' src={USFlag}/>
                        <h3>Current</h3>
                        <h6>Jersey City, NJ</h6>
                    </div>
                </div>

                <div className="details-container home" >
                    <div className='home-location'>
                        <img className='flag' src={INDFlag}/>
                        <h3>Home</h3> 
                        <h6>Mumbai, India </h6>
                    </div>
                </div>
            </div>

            <div className="details-container">
                <img
                    src={StevensLogo}
                    alt="Experience icon"
                    className="uni-logo"
                />
                <h4>Masters</h4>
                <h6>Stevens Institute of Technology</h6>
                <h6>Master of Science</h6>
                <h6>Computer Science</h6>
                <p>2021 - 2023</p>
            </div>

            <div className="details-container">
                <img
                    src={MULogo}
                    alt="Experience icon"
                    className="uni-logo"
                />
                <h4>Bachelors</h4>
                <h6>University fo Mumbai</h6>
                <h6>Bachelor of Engineering</h6>
                <h6>Computer Engineering</h6>
                <p>2016 - 2020</p>
            </div>
            
        </div>
    );
}

export default AboutBlocks;