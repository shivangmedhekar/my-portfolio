import React, { useEffect, useRef, useState } from 'react';

const ScrollActive = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;

      sectionsRef.current.forEach((section) => {
        if (section) {
          const { id, offsetTop, offsetHeight } = section;

          if (scrollY > offsetTop - 50 && scrollY <= offsetTop + offsetHeight - 50) {
            setActiveLink(id);
          }
        }
      });
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Assuming you have a navigation menu with anchor links */}
      <nav className="nav__menu">
        <a href="#section1" className={activeLink === 'section1' ? 'active-link' : ''}>
          Section 1
        </a>
        <a href="#section2" className={activeLink === 'section2' ? 'active-link' : ''}>
          Section 2
        </a>
        {/* Add more links as needed */}
      </nav>

      {/* Reference to sections */}
      <section ref={(ref) => ref && sectionsRef.current.push(ref)} id="section1">
        {/* Section 1 content */}
      </section>
      <section ref={(ref) => ref && sectionsRef.current.push(ref)} id="section2">
        {/* Section 2 content */}
      </section>
      {/* Add more sections as needed */}
    </div>
  );
};

export default ScrollActive;
