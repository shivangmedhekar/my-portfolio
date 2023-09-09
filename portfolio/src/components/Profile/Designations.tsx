import React from 'react';

import { Typewriter } from 'react-simple-typewriter';

const Designations: React.FC = () => {

    const designations: string[] = ['CS Gradute Student','Software Engineer', 'Developer', 'Dev Ops'];
    
    return(
        <p className="section__text__p2">
            <Typewriter 
                words={ designations }
                loop={100}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
            />
        </p>
    );
}

export default Designations;