import React from 'react';

import Technology from './Technology';

import ArrowPNG from '../../assets/arrow.png';

import './Experience.css';

const FrontEndSkills = [
  { name: 'HTML', level: 'Experienced' },
  { name: 'CSS', level: 'Experienced' },
  { name: 'SASS', level: 'Intermediate' },
  { name: 'JavaScript', level: 'Basic' },
  { name: 'TypeScript', level: 'Basic' },
  { name: 'Material UI', level: 'Intermediate' },
];

const BackEndSkills = [
  { name: 'PostgreSQL', level: 'Basic' },
  { name: 'Node JS', level: 'Intermediate' },
  { name: 'Express JS', level: 'Intermediate' },
  { name: 'Git', level: 'Intermediate' },
];

const Experience: React.FC = () => {
    return (
      <section id="experience">
        <p className="section__text__p1">Explore My</p>
        <h1 className="title">Experience</h1>
        <div className="experience-details-container">
          <div className="about-containers">

            <Technology 
              name = 'Frontend Development'
              skillList={FrontEndSkills}
            />

            <Technology 
              name='Backend Development'
              skillList={BackEndSkills}
            />

            </div>
        </div>

        <img
          src={ArrowPNG}
          alt="Arrow icon"
          className="icon arrow"
          onClick={() => (window.location.href = './#projects')}
        />
        
      </section>
    );
}

export default Experience;