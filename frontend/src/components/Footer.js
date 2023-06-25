import React from 'react';
import { Flex, Text, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

// Footer
function Footer() {
    return (
    <Flex p="2" bg="transparent" color="white" boxShadow="md" position="sticky" bottom={0} zIndex={3}>
    <Text fontSize="sm">© 2023 My Portfolio</Text>
    <Spacer />
    <RouterLink href="#" color="white">Privacy Policy</RouterLink>
    <RouterLink ml="5" href="#" color="white">Terms of Service</RouterLink>
    </Flex>
    );
    }
    
    



export default Footer;
