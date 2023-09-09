import React from 'react';

const ProfileButtons: React.FC = () => {

    const downloadResume = () => {
        window.open('../../assets/resume-example.pdf');
    }

    const goToContacts = () => {
        window.location.href = './#contact';
    }

    return(
        <div className="btn-container">
            <button className="btn btn-color-2" onClick={ downloadResume }>
                Download CV
            </button>

            <button className="btn btn-color-1" onClick={ goToContacts }>
                Contact Info
            </button>
        </div>
    );
}

export default ProfileButtons;