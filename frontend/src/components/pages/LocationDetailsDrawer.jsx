import React from 'react';
import { Box, Heading, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from '@chakra-ui/react';

function LocationDetailsDrawer({ isOpen, onClose, locationDetails }) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Location Details</DrawerHeader>
          <DrawerBody>
            {/* Show location details here */}
            <Box>
              <Heading size="md">Country: {locationDetails?.country}</Heading>
              <p>Latitude: {locationDetails?.lat}</p>
              <p>Longitude: {locationDetails?.long}</p>
              {/* Add more location details as required */}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default LocationDetailsDrawer;
