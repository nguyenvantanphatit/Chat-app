import { ChakraProvider, Spinner, Center } from '@chakra-ui/react';
 import Login from "../component/Login";
// import Sidebar from '../component/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseconfig';


function MyApp({ Component, pageProps }) {

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner />
        </Center>

      </ChakraProvider>
    )

  }
  if(!user){
  return (
    <ChakraProvider>

    <Login />
    </ChakraProvider>
  )
  }

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
