import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Avatar } from "@chakra-ui/avatar";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import Sidebar from "../../component/Sidebar";
import { FormControl } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import getOtherEmail from "../../utils/getOtherEmail";
import { useState } from "react";
import { useRef, useEffect } from "react";

const Topbar = ({ email }) => {
  return (
    <Flex bg="gray.100" h="81px" w="100%" align="center" p={5}>
      <Avatar src="" marginEnd={3} />
      <Heading size="lg">{email}</Heading>
    </Flex>
  );
};
const BottomBar = ({ id, user }) => {
  const [input, setInput] = useState("");

  const sendMessages = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };
  return (
    <FormControl p={3} onSubmit={sendMessages} as="form">
      <Input
        type="text"
        placeholder="Type a message..."
        autoCapitalize="off"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button type="submit" hidden>
        Submit
      </Button>
    </FormControl>
  );
};
export default function Chat() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  // const bottomOfChat = useRef();
  const [chat] = useDocumentData(doc(db, "chats", id));
  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user.email;
      return (
        <Flex
          key={Math.random()}
          alignSelf={sender ? "flex-start" : "flex-end"}
          bg={sender ? "blue.100" : "green.100"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
        >
          <Text>{msg.text}</Text>
        </Flex>
      );
    });

  //     useEffect(() =>
  //     setTimeout(
  //       bottomOfChat.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: 'start',
  //     }), 100)
  //   , [messages])
  return (
    <Flex h="100vh">
      <Head>
        <title>Chat app</title>
      </Head>
      <Sidebar />

      <Flex bg="blue.100" flex={1} direction="column">
        <Topbar email={getOtherEmail(chat?.users, user)} />
        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflow="scroll"
          sx={{ scrollbarWidth: "none" }}
        >
          {getMessages()}
          {/* <div ref={bottomOfChat}></div> */}
        </Flex>
        <BottomBar id={id} user={user} />
      </Flex>
    </Flex>
  );
}
