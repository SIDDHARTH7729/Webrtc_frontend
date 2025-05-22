import SocketIoClient from 'socket.io-client';
import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ws_server = "http://localhost:5500";

export const SocketContext = createContext<any|null>(null)

const socket = SocketIoClient(ws_server,{
    withCredentials: false,
    transports: ['polling','websocket'],
})

interface Props{
    children: React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({children}) =>{

    const navigate = useNavigate(); // will help to navigate
    useEffect(() => {
          const enterRoom = ({roomId}: {roomId: string}) => {
            console.log("Room created with id: ", roomId);
            navigate(`/room/${roomId}`);
          }

          socket.on("room-created", enterRoom); // when the client will emit create room event we will call the create room function
    },[])

    return(
       <SocketContext.Provider value={{socket}}>
            {children}
       </SocketContext.Provider>
    )
}