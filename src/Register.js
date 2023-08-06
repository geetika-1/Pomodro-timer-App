import {useState} from 'react'
import {
 
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text, Link as ChakraLink 
} from "@chakra-ui/react";
import {auth} from './firebase'
import {useNavigate,Link as ReactRouterLink} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {useAuthValue} from './AuthContext'


function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {setTimeActive} = useAuthValue()
  
    const validatePassword = () => {
      let isValid = true
      if (password !== '' && confirmPassword !== ''){
        if (password !== confirmPassword) {
          isValid = false
          setError('Passwords does not match')
        }
      }
      return isValid
    }
  
    const register = e => {
      e.preventDefault()
      setError('')
      if(validatePassword()) {
      
          createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            sendEmailVerification(auth.currentUser)   
            .then(() => {
              setTimeActive(true)
              navigate('/verify-email')
            }).catch((err) => alert(err.message))
          })
          .catch(err => setError(err.message))
      }
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
    
    return(
        <Box
        width="100%"
        maxWidth="400px"
        padding="20px"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="lg"
      >
           {error && <Box className='auth__error'>{error}</Box>}
        <FormControl marginBottom="15px"  name='register_form'>
          <FormLabel>Username</FormLabel>
          <Input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}/>
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
        <FormControl marginBottom="15px">
          <FormLabel>Confirm Password</FormLabel>
          <Input 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}/>

        </FormControl>
        <Button colorScheme="teal"  onClick={register}>
          Login
        </Button>
        <Text>
            Already have account? 
            
            <ChakraLink as={ReactRouterLink} to='/login' >
            Login here
</ChakraLink>
          </Text>
      </Box>
    )
}

export default Register;