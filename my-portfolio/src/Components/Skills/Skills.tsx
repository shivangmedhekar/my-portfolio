import React, { useEffect, useRef } from 'react';

import Technology from './SubComponents/Technology';

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

    const frontEndIcon = ["uil", "uil-brackets-curly", "skills__icon"];
    const frontEndSkills = [
        { name: 'HTML', percentage: 90 },
        { name: 'CSS', percentage: 80 },
        { name: 'JavaScript', percentage: 60 },
        { name: 'React', percentage: 85 }
    ];


    const backEndIcon = ["uil", "uil-server-network", "skills__icon"];
    const backEndSkills = [
        { name: 'PHP', percentage: 80 },
        { name: 'Node Js', percentage: 70 },
        { name: 'Firebase', percentage: 90 },
        { name: 'Python', percentage: 55 },
    ];

    const designerIcon = ["uil", "uil-swatchbook", "skills__icon"]
    const designerSkills = [
        { name: 'Figma', percentage: 90 },
        { name: 'Sketch', percentage: 85 },
        { name: 'Photoshop', percentage: 85 },
    ];

    return (
        <section className="skills section" id="skills">
            <h2 className="section__title">Skills</h2>
            <span className="section__subtitle">My technical level</span>

            <div className="skills__container container grid">

                <Technology title='Frontend Development' icons_classes={ frontEndIcon } subtitle='More than 4 years' skills={frontEndSkills}/>
                <Technology title='Backend Development' icons_classes={ backEndIcon } subtitle='More than 2 years' skills={backEndSkills}/>
                <Technology title='Designer' icons_classes={ designerIcon } subtitle='More than 5 years' skills={designerSkills}/>
                
            </div>
        </section>
    );
}

export default Skills;