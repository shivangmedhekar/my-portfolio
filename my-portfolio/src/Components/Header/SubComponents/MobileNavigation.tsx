import React from 'react';

import ToggleTheme from './ToggleTheme';


interface MobileNavigationProps {
    onClickHandler: () => void;
}

const MobileNavigation: React.FC <MobileNavigationProps> = ({ onClickHandler }) => {

    
    return(
        <div className="nav__btns">
            {/* Theme change button*/}
            <ToggleTheme />

            <div className={`nav__toggle`} id="nav-toggle" onClick={ onClickHandler }>
                <i className="uil uil-apps"></i>
            </div>
        </div>
    );
}

export default MobileNavigation;