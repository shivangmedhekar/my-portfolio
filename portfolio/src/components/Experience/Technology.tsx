import React from 'react';

import Skill from './Skill';

interface TechnologysProps {
    name: string;
    skillList: { name: string; level: string }[];
}

const Technology: React.FC<TechnologysProps> = ({ name, skillList }) => {
    return (
        <div className="details-container">
            <h2 className="experience-sub-title">Frontend Development</h2>

            <div className="article-container">

                {skillList.map((skill) => (
                    <Skill key={skill.name} name={skill.name} level={skill.level} />
                ))}

            </div>
        </div>
    );
}

export default Technology;