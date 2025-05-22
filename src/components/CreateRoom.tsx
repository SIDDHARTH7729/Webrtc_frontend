import { useContext } from "react"
import { SocketContext } from "../context/socket-context"

const CreateRoom: React.FC = () =>{

   const {socket} = useContext(SocketContext);

   const initRoom = () =>{
    console.log("Intiialising room connection or req");
    socket.emit("create-room");
   }
   return (
     <button onClick={initRoom} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
        Start a new meeting in a new room
     </button>
   )
}

export default CreateRoom