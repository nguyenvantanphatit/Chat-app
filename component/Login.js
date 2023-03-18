import Head from "next/head";
import { ChatIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Stack } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";

export default function Login() {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>

            <Center
                h="100vh"
            >
                <Stack
                align="center"
                backgroundColor="gray.600"
                p={16}
                rounded="3xl"
                spacing={12}
                boxShadow="lg"
                >

                    <Box
                        backgroundColor="blue.500"
                        width="fit-content"
                        p={5}
                        rounded="3xl"
                        boxShadow="md"
                    >
                        <ChatIcon w="100" h="100" color="white" />

                    </Box>
                    <Button boxShadow="md" onClick={() => signInWithGoogle("", {prompt: "select_account"})}>Sign In with Google</Button>
                </Stack>

            </Center>
        </>

    )
}