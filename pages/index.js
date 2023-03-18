import Head from "next/head";
import Image from "next/image";
import Sidebar from "../component/Sidebar";
import styles from "../styles/Home.module.css";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box h="100vh">
        <Sidebar />
      </Box>
    </div>
  );
}