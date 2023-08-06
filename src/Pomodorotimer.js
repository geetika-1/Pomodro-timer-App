import React, { useState, useEffect } from 'react';
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'

const Pomodorotimer = () => {
  const [timer, setTimer] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  

  useEffect(() => {
    let interval;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, timer]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimer(1500);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    
    <Box textAlign="center" mt={8}>
      <span onClick={() => signOut(auth)}>Sign Out</span>
        <Text fontSize="3xl" fontWeight="bold" mb={4}>
        Pomodoro Timer App
      </Text>
        <Flex align="center" justify="center">
      
      <Box w="200px" 
      h="200px"  
      bg="blue.500" 
      borderRadius="full"
      display="flex"     
      justifyContent="center" 
      alignItems="center"  
      mb="2"   
>
      <Text fontSize="40" fontWeight="bold" mb={4}>
        {formatTime(timer)}
      </Text>
      </Box>
      </Flex>
      <Button colorScheme="teal" size="lg" onClick={toggleTimer} mr={4}>
        {isActive ? 'Pause' : 'Start'}
      </Button>
      <Button colorScheme="red" size="lg" onClick={resetTimer}>
        Reset
      </Button>
      
    </Box>
    
  );
};



  export default Pomodorotimer ;