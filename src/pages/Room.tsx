import { useParams } from "react-router-dom"

const Room:React.FC = () =>{

    const {id} = useParams<{id:string}>();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Room</h1>
            <p className="text-lg">This is the room page.</p>
        </div>
    )
}
export default Room