import React from 'react';

import Project from './Project';

import './Projects.css';

import ProjectPic1 from '../../assets/project-1.png';
import ProjectPic2 from '../../assets/project-2.png';
import ProjectPic3 from '../../assets/project-3.png';
import ArrowICON from '../../assets/arrow.png';

const projectData = [
  {
    imgSrc: ProjectPic1,
    imgAlt: 'Project 1',
    GitHubLink: 'https://github.com/',
    LiveDemoLink: 'https://github.com/',
  },
  {
    imgSrc: ProjectPic2,
    imgAlt: 'Project 2',
    GitHubLink: 'https://github.com/',
    LiveDemoLink: 'https://github.com/',
  },
  {
    imgSrc: ProjectPic3,
    imgAlt: 'Project 3',
    GitHubLink: 'https://github.com/',
    LiveDemoLink: 'https://github.com/',
  },
];

const Projects: React.FC = () => {
    return (
        <section id="projects">
          <p className="section__text__p1">Browse My Recent</p>
          <h1 className="title">Projects</h1>
          <div className="experience-details-container">
            
            <div className="about-containers">

              {projectData.map((project, index) => (
                <Project
                  key={index}
                  imgSrc={project.imgSrc}
                  imgAlt={project.imgAlt}
                  GitHubLink={project.GitHubLink}
                  LiveDemoLink={project.LiveDemoLink}
                />
              ))}

            </div>

          </div>
          <img
            src={ArrowICON}
            alt="Arrow icon"
            className="icon arrow"
            onClick={() => (window.location.href = './#contact')}
          />
        </section>
    )
}

export default Projects;