import React from 'react';
import { Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const MotionButton = motion(Button);

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

function Navbar() {
  return (
    <Flex mt="3" bg="transparent" color="white" boxShadow="md" position="sticky" top={0} zIndex={3}>
      <Heading size="md" ml="2">My Portfolio</Heading>
      <Spacer />
      <Link to="/">
        <MotionButton
          mr="2"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          colorScheme="black"
          size="lg"
          color="white"
        >
          Home
        </MotionButton>
      </Link>
      <Link to="/about">
        <MotionButton
          mr="2"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          colorScheme="black"
          size="lg"
          color="white"
        >
          About
        </MotionButton>
      </Link>
      <Link to="/experience">
        <MotionButton
          mr="2"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          colorScheme="black"
          size="lg"
          color="white"
        >
          Experiences
        </MotionButton>
      </Link>
      <Link to="/hobby">
        <MotionButton
          mr="2"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          colorScheme="black"
          size="lg"
          color="white"
        >
          Hobbies
        </MotionButton>
      </Link>
      <Link to="/location">
        <MotionButton
          mr="2"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          colorScheme="black"
          size="lg"
          color="white"
        >
          Location
        </MotionButton>
      </Link>
    </Flex>
  );
}


export default Navbar;
