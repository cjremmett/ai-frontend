import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://cjremmett.com/flask';

export const socket = io(URL);

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });