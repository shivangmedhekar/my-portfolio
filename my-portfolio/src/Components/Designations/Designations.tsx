import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import designationsData from '../../Data/designationsData.json';

interface DesignationsProps {
    class_name: string;
}

const Designations: React.FC <DesignationsProps> = ( { class_name }) => {

    const designations: string[] = designationsData.designations;

    return(
        <h3 className={class_name}>
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