import React, { useEffect, useRef } from 'react';

import Technology from './SubComponents/Technology';
import skillsData from '../../Data/SkillsData.json';

const Skills: React.FC = () => {

    const skillsHeaders = useRef<NodeListOf<HTMLDivElement> | null>(null);

    useEffect(() => {
        skillsHeaders.current = document.querySelectorAll('.skills__header');

        function toggleSkills(event: MouseEvent) {
        const target = event.currentTarget as HTMLElement;
        let itemClass = target.parentElement?.className;

        const skillsContent = document.querySelectorAll('.skills__content');

        for (let i = 0; i < skillsContent.length; i++) {
            skillsContent[i].className = 'skills__content skills__close';
        }

        if (itemClass === 'skills__content skills__close') {
            target.parentElement!.className = 'skills__content skills__open';
        }
        }

        const headers = skillsHeaders.current;

        headers?.forEach((el) => {
        el.addEventListener('click', toggleSkills);
        });

        return () => {
        headers?.forEach((el) => {
            el.removeEventListener('click', toggleSkills);
        });
        };
    }, []);
    
    const programmingLanguagesIcon = ["bx", "bx-code-alt", "skills__icon"];
    const programmingLanguages = skillsData.programmingLanguages;


    const frontEndIcon = ["uil", "uil-desktop", "skills__icon"];
    const frontEndSkills = skillsData.frontEndSkills;


    const backEndIcon = ["uil", "uil-server-network", "skills__icon"];
    const backEndSkills = skillsData.backEndSkills;

    const devopsIcon = ["uil", "uil-cloud-database-tree", "skills__icon"]
    const devopsSkills = skillsData.devopsSkills;

    return (
        <section className="skills section" id="skills">
            <h2 className="section__title">Skills</h2>
            <span className="section__subtitle">My technical level</span>

            <div className="skills__container container grid">
                
                <Technology title='Programming Languages' icons_classes={ programmingLanguagesIcon } subtitle='More than 4 years' skills={ programmingLanguages }/>
                <Technology title='Frontend Development' icons_classes={ frontEndIcon } subtitle='More than 4 years' skills={ frontEndSkills }/>
                <Technology title='Backend Development' icons_classes={ backEndIcon } subtitle='More than 2 years' skills={ backEndSkills }/>
                <Technology title='Devops' icons_classes={ devopsIcon } subtitle='More than 5 years' skills={ devopsSkills }/>
                
            </div>
        </section>
    );
}

export default Skills;