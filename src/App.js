import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./Register";
import VerifyEmail from "./VerifyEmail";
import Login from "./Login";
import { useState, useEffect } from "react";
import { AuthProvider } from "./AuthContext";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./PrivateRoute";
import { Navigate } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Pomodorotimer from "./Pomodorotimer";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <ChakraProvider>
                  <Pomodorotimer />
                </ChakraProvider>
              </PrivateRoute>
            }
          />

          <Route
            path="/login"
            element={
              !currentUser?.emailVerified ? (
                <ChakraProvider>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="100vh"
                  >
                    <Login />
                  </Box>
                </ChakraProvider>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !currentUser?.emailVerified ? (
                <ChakraProvider>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="100vh"
                  >
                    <Register />
                  </Box>
                </ChakraProvider>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/verify-email"
            element={
              <ChakraProvider>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minHeight="100vh"
                >
                  <VerifyEmail />
                </Box>
              </ChakraProvider>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
