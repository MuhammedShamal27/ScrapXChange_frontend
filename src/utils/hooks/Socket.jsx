import {io} from "socket.io-client"

// const socket = io(`${import.meta.env.VITE_SCRAPXCHANGE_API_URL}`, {
//     transports: ["websocket"],
//     debug: true,
//   });

const socket = io('https://royalsofa.online', { transports: ['websocket'] });


export default socket;