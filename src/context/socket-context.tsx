import SocketIoClient from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as UUIDv4} from 'uuid';
import Peer from "peerjs"

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

    // store user id
    const [user,setUser] = useState<Peer>(); // new peer user
    const [stream, setStream] = useState<MediaStream>();

    const fetchUserFeed = async () =>{
        const stream = await navigator.mediaDevices.getUserMedia({
            video:true,audio:true
        });
        setStream(stream);
    }


    const navigate = useNavigate(); // will help to navigate
    useEffect(() => {

            // create a new user
            const userId = UUIDv4(); // unique user id
            const newPeer = new Peer(userId);

            setUser(newPeer); // set the user id
            fetchUserFeed();
           
            const enterRoom = ({roomId}: {roomId: string}) => {
            console.log("Room created with id: ", roomId);
            navigate(`/room/${roomId}`);
          }

          socket.on("room-created", enterRoom); // when the client will emit create room event we will call the create room function
    },[])

    return(
       <SocketContext.Provider value={{socket,user,stream}}>
            {children}
       </SocketContext.Provider>
    )
}