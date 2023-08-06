import React, { useState } from 'react';
import {
 
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link as ChakraLink 
} from "@chakra-ui/react";
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth} from './firebase'
import {useNavigate,Link as ReactRouterLink} from 'react-router-dom'
import {useAuthValue} from './AuthContext'


const LloginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [error, setError] = useState('')
    const {setTimeActive} = useAuthValue()
    const navigate = useNavigate()
  
    const login = e => {
      e.preventDefault()
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if(!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
          .then(() => {
            setTimeActive(true)
            navigate('/verify-email')
          })
        .catch(err => alert(err.message))
      }else{
        navigate('/')
      }
      })
      .catch(err => setError(err.message))
    }
  return (
    <Box
      width="100%"
      maxWidth="400px"
      padding="20px"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="lg"
    >
         {error && <Box className='auth__error'>{error}</Box>}
      <FormControl marginBottom="15px"  name='login_form'>
        <FormLabel>Username</FormLabel>
        <Input
          type="email"
          value={email}
          required
          placeholder="Enter your email"
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl marginBottom="15px">
        <FormLabel>Password</FormLabel>
        <Input 
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>
      </FormControl>
      <Button colorScheme="teal"  onClick={login}>
        Login
      </Button>
      <Text>
          Don't have and account? 
          <ChakraLink as={ReactRouterLink} to='/register' >
            Create a new account
</ChakraLink>
        </Text>
    </Box>
  );
};

export default LloginForm;