import React from 'react';

interface QualificationItems {
    title: string;
    subtitle: string;
    calendar: string;
  }
  
// Array of Education Qualifications
const educationQualifications: QualificationItems[] = [
    {
        title: 'Computer Engineer',
        subtitle: 'Peru - University',
        calendar: '2009 - 2014',
    },
    {
        title: 'Web Design',
        subtitle: 'Spain - Institute',
        calendar: '2014 - 2017',
    },
    {
        title: 'Web Development',
        subtitle: 'Peru - Institute',
        calendar: '2017 - 2019',
    },
    {
        title: 'Master in Ui/Ux',
        subtitle: 'Peru - Institute',
        calendar: '2019 - 2021',
    },
];


  
const workQualifications: QualificationItems[] = [
    {
        title: 'Software Engineer',
        subtitle: 'Microsoft - Peru',
        calendar: '2016-2018',
    },
    {
        title: 'Frontend Developer',
        subtitle: 'Apple Inc - Spain',
        calendar: '2018-2020',
    },
    {
        title: 'Ui Designer',
        subtitle: 'Figma - Spain',
        calendar: '2020-2021',
    },
];

export default [educationQualifications, workQualifications];