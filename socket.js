import { io } from 'socket.io-client';

const URL = 'https://cjremmett.com';

export const socket = io(URL, {path: "/flask/socket.io"});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});