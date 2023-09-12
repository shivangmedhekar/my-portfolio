import React from 'react';

// TODO work on Active Scroll on Navigation
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Skills from './Components/Skills/Skills';
import Qualification from './Components/About/Qualification';
import Portfolio from './Components/Portofolio/Portfolio';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Skills />
      <Qualification />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
