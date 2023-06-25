import React from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Global, css } from "@emotion/react";
// Import Pages Here

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
          {/*
          Set Routes Here
          <Route path="/" element={< pagename />} />
          */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
