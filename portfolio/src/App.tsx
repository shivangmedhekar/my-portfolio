import React from 'react';


import Button from 'react-bootstrap/Button';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// Importing Components

// TODO Fix MobileNavigation

import { Layout } from 'antd';
import Scrollspy from 'react-ui-scrollspy';

import NavigationBar from './components/NavigationBar/NavigationBar';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// Importing CSS
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <>
    <Layout>
      <Header style={{height: '17vh'}}>
        <NavigationBar /> 
      </Header>
      
      <Content>
        <Profile />
        <About />
        <Experience />
        <Projects />
        <Contact />
      
      </Content>
      
      <Footer />
    </Layout>
      
    </>
  );
}

export default App;
