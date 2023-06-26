import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, VStack, Heading, Text, Progress, UnorderedList, ListItem, useColorModeValue, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { motion } from 'framer-motion';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshBasicMaterial } from 'three';

import Navbar from '../Navbar';
import Footer from '../Footer';

const MotionBox = motion(Box);

function Model() {
  const ref = useRef();
  const colors = ['#ADD8E6', '#9DB2E1', '#8D8CDC', '#7D66D7', '#6D40D2', '#5C1ACD', '#4B00C9'];
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
  }, []);

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

function Hobby() {
  const bgGradient = useColorModeValue("linear(to-br, #4b5178, #3a4062)", "linear(to-br, #4b5178, #3a4062)");
  const url = `http://127.0.0.1:5000/hobby`;
  const [data, setData] = useState([]);

  useEffect(() => {
    getHobby(url);
  }, []);

  const colorModeValue = useColorModeValue("#4b5178", "white");

  function getHobby(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

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
          borderColor={colorModeValue}
        >
          <Tabs colorScheme="purple" variant="soft-rounded" size="lg" isFitted>
            <TabPanels>
              <TabPanel>
                <VStack spacing={6} alignItems="flex-start" maxW={'lg'}>
                  <Heading fontSize="2xl" color="white">Hobbies</Heading>
                  {data.map((item) => (
                    <Box w="full" p={4}>
                      <Text mb="1" fontSize="xl" color="white">{item.name}</Text>
                      <img src={item.img} alt={item.name} />
                    </Box>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </MotionBox>

      <Footer />
    </Box>
  );
}

export default Hobby;