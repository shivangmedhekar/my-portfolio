import React from 'react';

interface ProjectProps {
    imgSrc: string;
    imgAlt: string;
    GitHubLink: string;
    LiveDemoLink: string;
}

const Project: React.FC<ProjectProps> = ({ imgSrc, imgAlt, GitHubLink, LiveDemoLink }) => {
    return(
        <div className="details-container color-container">
            <div className="article-container">
              <img
                src={imgSrc}
                alt={imgAlt}
                className="project-img"
              />
            </div>
            <h2 className="experience-sub-title project-title">Project One</h2>
            <div className="btn-container">
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => (window.location.href = GitHubLink)}
              >
                Github
              </button>
              <button
                className="btn btn-color-2 project-btn"
                onClick={() => (window.location.href = LiveDemoLink)}
              >
                Live Demo
              </button>
            </div>
        </div>
    );
}

export default Project;