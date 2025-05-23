import { useParams } from "react-router-dom"
import { SocketContext } from "../context/socket-context";
import { useContext, useEffect } from "react";
import UserFeedPlayer from "../components/USerFeedPlayer";

const Room: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const { socket, user, stream } = useContext(SocketContext);

    const fetchParticipants = ({ participants, roomId }: { participants: string[], roomId: string }) => {
        console.log("Fetched participants: ", participants);
        console.log("The room with id is : ", roomId)

    }

    useEffect(() => {
        // emitting this event so that either creater of this room or joiner, anyone is added
        // so that server knows new people has been added to this room
        if (user) socket.emit("join-room", { roomId: id, peerId: user._id }); // when the client will emit create room event we will call the create room function
        socket.on("get-users", fetchParticipants);

        socket.on("user-joined", ({ peerId }: { peerId: string }) => {
            console.log(`${peerId} joined the room`);
        });

        socket.on("user-left", ({ peerId }: { peerId: string }) => {
            console.log(`${peerId} left the room`);
        });

        const handleBeforeUnload = () => {
            if (user) {
                socket.emit("leave-room", { roomId: id, peerId: user._id });
            }
        }
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            if (user) {
                socket.emit("leave-room", { roomId: id, peerId: user._id });
            }
            // socket.off("get-users",fetchParticipants);
        }
    }, [id, user, socket])

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Room</h1>
            <p className="text-lg">This is the room page.</p>
            <UserFeedPlayer stream={stream} />
        </div>
    )
}
export default Room