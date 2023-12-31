
import {useAuthValue} from './AuthContext'
import {useState, useEffect} from 'react'
import {auth} from './firebase'
import {sendEmailVerification} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {
 
  Box,
  Button,
  Text,

} from "@chakra-ui/react";

function VerifyEmail() {

  const {currentUser} = useAuthValue()
  const [time, setTime] = useState(60)
  const {timeActive, setTimeActive} = useAuthValue()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        if(currentUser?.emailVerified){
          clearInterval(interval)
          navigate('/')
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [navigate, currentUser])

  useEffect(() => {
    let interval = null
    if(timeActive && time !== 0 ){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    }else if(time === 0){
      setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive])

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      setTimeActive(true)
    }).catch((err) => {
      alert(err.message)
    })
  }

  return (
    <Box
    width="100%"
    maxWidth="400px"
    padding="20px"
    borderWidth="1px"
    borderRadius="md"
    boxShadow="lg">
      <Text>
      Verify your Email Address
      </Text>
      <Text>
      A Verification email has been sent to:
      </Text>
      <Box>{currentUser?.email}</Box>
      <Box>Follow the instruction in the email to verify your account</Box> 
      <Button 
      colorScheme="teal"
          onClick={resendEmailVerification}
          disabled={timeActive}
        >Resend Email {timeActive && time}</Button>

    </Box>
  )
}

export default VerifyEmail;
