import React from 'react';
import { Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

// Navbar
function Navbar() {
    return (
        <Flex mt="3" bg="transparent" color="white" boxShadow="md" position="sticky" top={0} zIndex={3}>
        <Heading size="md" ml="2">My Portfolio</Heading>
    <Spacer />
    <RouterLink to="/contact">
    <MotionButton
    mr = "2"
    whileHover="hover"
    whileTap="tap"
    variants={buttonVariants}
    colorScheme="purple"
    size="lg"
    color="white"
    >
    Contact Me
    </MotionButton>
    </RouterLink>
    </Flex>
    );
    }
    

export default Navbar;
