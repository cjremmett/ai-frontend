'use client'

import React, { useState, useEffect } from 'react';
import ChatWindow2 from "@/components/ChatWindow/ChatWindow2";
import styles from "./page.module.css";
import { socket } from '../socket';
import { ConnectionState } from '../components/ConnectionState';
import { ConnectionManager } from '../components/ConnectionManager';
import { Events } from "../components/Events";
import { MyForm } from '../components/MyForm';

export default function Home() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <>
      <h1 className={ styles.cjremmett_header}><a className = { styles.cjremmett_link } href="https://cjremmett.com">cjremmett.com</a></h1>
      <ChatWindow2 />
    </>
  );
}
