import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Global, css } from "@emotion/react";
import HomePage from './components/pages/Home.jsx';
import AboutMe from './components/pages/About.jsx';
import Experience from './components/pages/Experience.jsx';
import Hobby from './components/pages/Hobby.jsx';


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Global
          styles={css`
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              overflow-x: hidden;
            }
          `}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutMe />} /> 
          <Route path="/experience" element={<Experience />} />
          <Route path="/hobby" element={<Hobby />} />
          {/* Notice the change here */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;