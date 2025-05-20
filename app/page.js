'use client'

import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
// import { socket } from '../socket';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Chatbot from "@/components/Chatbot/Chatbot"


export default function Home() {
  // const [isConnected, setIsConnected] = useState(socket.connected);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //   };
  // }, []);

  return (
    <>
      <GoogleOAuthProvider clientId="<your_client_id>">
        <h1 className={ styles.cjremmett_header}><a className = { styles.cjremmett_link } href="https://cjremmett.com">cjremmett.com</a></h1>
        <Chatbot />
      </GoogleOAuthProvider>
    </>
  );
}
