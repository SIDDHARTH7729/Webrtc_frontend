import CreateRoom from "../components/CreateRoom"

const Home:React.FC = () =>{
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to the Video Chat App</h1>
            <CreateRoom/>
        </div>
    )
}

export default Home