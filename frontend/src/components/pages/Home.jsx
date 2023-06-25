import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Heading as="h1" size="2xl">Welcome to the Home Page!</Heading>
    </Box>
  );
}

export default Home;
