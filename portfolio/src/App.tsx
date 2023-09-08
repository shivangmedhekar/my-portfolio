import React from 'react';
import Button from 'react-bootstrap/Button';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// Importing Components

// TODO Fix MobileNavigation
import NavigationBar from './components/NavigationBar/NavigationBar';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// Importing CSS
import './App.css';

function App() {
  return (
    <>
      <NavigationBar /> 
      <Profile />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
