import React, { useState, useEffect } from 'react';

const ToggleTheme: React.FC = () => {

    const [theme, setTheme] = useState<string | null>(localStorage.getItem('selected-theme'));
    const [icon, setIcon] = useState<string | null>(localStorage.getItem('selected-icon'));   

    const darkTheme = 'dark-theme';
    const iconTheme = 'uil-sun';

    // Function to toggle theme and icon
    const toggleTheme = () => {
        if (theme === 'dark') {
        setTheme('light');
        setIcon('uil-sun');
        } else {
        setTheme('dark');
        setIcon('uil-moon');
        }
    };

    // Add event listener on component mount
    useEffect(() => {
        document.body.classList.toggle(darkTheme, theme === 'dark');
        const themeButton = document.getElementById('theme-button');
        themeButton?.classList.toggle(iconTheme, theme === 'dark');
    }, [theme]);

    // Save selected theme and icon to localStorage
    useEffect(() => {
        localStorage.setItem('selected-theme', theme || 'light');
        localStorage.setItem('selected-icon', icon || 'uil-sun');
    }, [theme, icon]);

    return(
        <i className="uil uil-moon change-theme" id="theme-button" onClick={ toggleTheme }></i>
    );
}

export default ToggleTheme;