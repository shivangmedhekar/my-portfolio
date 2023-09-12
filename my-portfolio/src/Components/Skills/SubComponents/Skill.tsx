import React from 'react';

interface SkillProps {
    name: string
    percentage: number
}

const Skill: React.FC <SkillProps> = ({ name, percentage }) => {
    const barStyle = {
        width: `${percentage}%`, // Set the width based on the percentage prop
    };
    
    return(
        <div className="skills__data">
            <div className="skills__titles">
                <h3 className="skills__name">{ name }</h3>
                <span className="skills__number">{`${percentage}%`}</span>
            </div>
            <div className="skills__bar">
                <span className="skills__percentage" style={barStyle}></span>
            </div>
        </div>
    );
}

export default Skill;