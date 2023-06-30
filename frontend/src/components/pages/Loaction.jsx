import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Box, VStack, Heading, useColorModeValue, TabPanel, TabPanels, Tabs, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay, Button } from '@chakra-ui/react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { motion } from 'framer-motion';
import { Raycaster, Vector2 } from 'three';
import { MeshBasicMaterial, TextureLoader, SphereGeometry, Mesh, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import earthTextureUrl from '../../Assets/earth.jpg'; // Path to your texture

// Converts geographic coordinates to 3D Cartesian coordinates (for 3D Earth)
function latLongToVector3(lat, lon, radius, height) {
  var phi = (lat)*Math.PI/180;
  var theta = (lon-180)*Math.PI/180;

  var x = -(radius+height) * Math.cos(phi) * Math.cos(theta);
  var y = (radius+height) * Math.sin(phi);
  var z = (radius+height) * Math.cos(phi) * Math.sin(theta);

  return new Vector3(x,y,z);
}

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

const Earth = () => {
  const texture = useLoader(TextureLoader, earthTextureUrl);
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.005));

  const [markersData, setMarkersData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { camera, raycaster, mouse } = useThree();

  useEffect(() => {
    fetch('http://127.0.0.1:5000/location')
      .then(response => response.json())
      .then(data => {
        setMarkersData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleMarkerClick = (marker) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lng}&key=YOUR_GOOGLE_API_KEY`)
    .then(response => response.json())
    .then(data => setSelectedLocation(data.results[0].formatted_address))
    .catch(error => console.error(error));
    setIsOpen(true);
  };

  const onClose = () => setIsOpen(false);

  const markerRefs = useRef([]);
  const addRef = (el) => {
    if (el && !markerRefs.current.includes(el)) {
      markerRefs.current.push(el);
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      // Convert mouse position to normalized device coordinates (-1 to +1) for both components.
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
      raycaster.setFromCamera(mouse, camera);
      const validObjects = markerRefs.current.filter(ref => ref && ref.current).map(ref => ref.current);
      const intersects = raycaster.intersectObjects(validObjects);
  
      if (intersects.length > 0) {
          const intersectedObject = intersects[0].object;
          const marker = markersData.find(marker => marker.id === intersectedObject.userData.id);
          if (marker) handleMarkerClick(marker);
      }
  };  
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [camera, raycaster, mouse, markerRefs, markersData]);

  return (
    <>
       <mesh ref={ref}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial map={texture} />
        {markersData?.length > 0 ? markersData.map((marker, index) => (
          // replace ref={markerRefs.current[index]} with ref={addRef}
          <mesh position={latLongToVector3(marker.lat, marker.long, 2, 0.1)} ref={addRef} userData={{ id: marker.id }}>
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshBasicMaterial color="purple" />
          </mesh>
        )) : console.error('Markers data is either undefined or empty.')}
      </mesh>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Location
            </AlertDialogHeader>

            <AlertDialogBody>
              {selectedLocation}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

function Location() {
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
        <Canvas style={{ position: "absolute", zIndex: 1, background: "#000000" }} attach="onPointerDown">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Earth />
          {[...Array(200)].map((_, i) => <Model key={i} />)}
        </Canvas>
      </MotionBox>
      <Footer />
    </Box>
  );
}

export default Location;
