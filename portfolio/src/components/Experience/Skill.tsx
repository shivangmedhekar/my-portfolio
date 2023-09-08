import React from 'react';
import CheckmarkPNG from '../../assets/checkmark.png';

interface SkillProps {
    name: string;
    level: string;
}


const Skill: React.FC<SkillProps> = ({ name, level }) => {
    return (
        <article>
            <img
                src={CheckmarkPNG}
                alt="Experience icon"
                className="icon"
            />
            <div>
                <h3>{name}</h3>
                <p>{level}</p>
            </div>
        </article>
    );
}

export default Skill;