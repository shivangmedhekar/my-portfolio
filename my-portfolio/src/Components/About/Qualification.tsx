import React, { useState } from 'react';

import QualificationItems from './SubComponments/QualificationItems';
import Qualifications from './QualificationData';



const Qualification = () => {

    const [activeTab, setActiveTab] = useState<string>('education');

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    }

    const [educationQualifications, workQualifications] = Qualifications;
      
    return (
        <section className="qualification section">
        <h2 className="section__title">Qualification</h2>
        <span className="section__subtitle">My personal journey</span>



        <div className="qualification__container container">

            <div className="qualification__tabs">
            <div className={`qualification__button button--flex ${activeTab === 'education' ? 'qualification__active' : ''}`}
                data-target="#education" onClick={() => handleTabClick('education')}>
                <i className="uil uil-graduation-cap qualification__icon"></i>
                Education
            </div>

            <div className={`qualification__button button--flex ${activeTab === 'work' ? 'qualification__active' : ''}`}
                data-target="#work" onClick={() => handleTabClick('work')}>
                <i className="uil uil-briefcase-alt qualification__icon"></i>
                Work
            </div>
            </div>

            <div className="qualification__sections">
                
            {/* EDUCATION QUALIFICATIONS */}
                <div className={`qualification__content ${activeTab === 'education' ? 'qualification__active' : ''}`} data-content id="education">
                    <QualificationItems qualificationItems={ educationQualifications }/>
                </div>

            {/* WORK QUALIFICATIONS */}
                <div className={`qualification__content ${activeTab === 'work' ? 'qualification__active' : ''}`} data-content id="work">
                    <QualificationItems qualificationItems={workQualifications} />
                </div>
            </div>
        </div>
        </section>
    );
};

export default Qualification;
