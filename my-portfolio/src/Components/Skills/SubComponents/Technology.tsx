import React from 'react';

import Skill from './Skill';

interface TechnologyProps {
    title: string;
    icons_classes: string[] ;
    subtitle: string;
    skills: {name: string, icon_classes: string, percentage: number}[]
}

const Technology: React.FC <TechnologyProps> = ( { title, icons_classes, subtitle, skills } ) => {
    return (
        <div className="skills__content skills__close">
            <div className="skills__header">
                <i className={ icons_classes.join(' ') }></i>

                <div>
                    <h1 className="skills__title">{ title }</h1>
                    <span className="skills__subtitle">{ subtitle }</span>
                </div>

                <i className="uil uil-angle-down skills__arrow"></i>
            </div>

            <div className="skills__list grid">

                {skills.map((item) => (
                    <Skill name={item.name} icon_classes={item.icon_classes} percentage={item.percentage}/>
                ))}

                {/* Add other skill items here */}
            </div>
        </div>
    );
}

export default Technology;