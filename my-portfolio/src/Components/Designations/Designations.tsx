import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import designationsData from '../../Data/designationsData.json';

const Designations: React.FC = () => {

    const designations: string[] = designationsData.designations;

    return(
        <h3 className="home__subtitle">
            <Typewriter 
                words={ designations }
                loop={100}
                cursor
                cursorStyle='|'
                typeSpeed={120}
                deleteSpeed={40}
                delaySpeed={3000}
            />
        </h3>
    );
}

export default Designations;