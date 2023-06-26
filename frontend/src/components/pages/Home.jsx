import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Link as RouterLink } from 'react-router-dom';
import { Box, VStack, Heading, Text, Button, useColorModeValue, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshBasicMaterial } from 'three';
import myImage from './me.png';
import Navbar from '../Navbar';
import Footer from '../Footer';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

function Model() {
  const ref = useRef();
  const colors = ['#ADD8E6', '#9DB2E1', '#8D8CDC', '#7D66D7', '#6D40D2', '#5C1ACD', '#4B00C9', ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load('/3D/puzzlePiece1.glb', (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new MeshBasicMaterial({ wireframe: true, color });
        }
      });
      setModel(gltf);
    });
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y -= 0.1;
      if (ref.current.position.y < -50) ref.current.position.y = 100;
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  return model ? <primitive object={model.scene} position={[Math.random() * 100 - 50, Math.random() * 100, Math.random() * 100 - 50]} ref={ref} /> : null;
}

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

function Home() {
  const bgGradient = useColorModeValue("linear(to-br, #4b5178, #3a4062)", "linear(to-br, #4b5178, #3a4062)");

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" backgroundColor="#000000">
      <Navbar />
      
      <MotionBox
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient={bgGradient}
        padding={4}
        animate={{ scale: [0.95, 1], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        <Canvas style={{ position: "absolute", zIndex: 1, background: "#000000" }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {[...Array(200)].map((_, i) => <Model key={i} />)}
        </Canvas>

        <Box 
          zIndex={2} 
          bg="#1a202c" 
          p={5} 
          rounded="xl" 
          shadow="2xl"
          backdropFilter="blur(10px)"
          borderWidth={2}
          borderColor={useColorModeValue("#4b5178", "white")}
        >
          <VStack spacing={2} textAlign="center" maxW={'lg'}>
            {/* Replace with your image */}
            <Image 
              src={myImage} 
              alt="my photo" 
              borderRadius="full" 
              boxSize="125px" 
              objectFit="cover" 
              borderWidth="2px"
              borderStyle="solid"
              borderColor={useColorModeValue("#4b5178", "white")}
            />
            <Heading 
              fontSize="4xl" 
              fontWeight="bold" 
              lineHeight="tight" 
              letterSpacing={"-.1rem"} 
              color={useColorModeValue("white", "white")}
            >
              Your Name
            </Heading>
            <Text mb = {2} 
              fontSize="xl" 
              color={useColorModeValue("white", "white")}
            >
              Brief about you, your work and skills
            </Text>
            <RouterLink to="/about">
              <MotionButton
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                colorScheme="purple"
                size="lg"
                color="white"
              >
                About Me
              </MotionButton>
            </RouterLink>
          </VStack>
        </Box>
      </MotionBox>

      <Footer />
    </Box>
  );
}

export default Home;
