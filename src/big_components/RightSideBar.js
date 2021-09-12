import { Avatar } from "@material-ui/core"
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import { useEffect, useState } from "react"
// import { RoomDetailContext } from "../context/RoomDetailContext"
import { useParams } from "react-router"
import db from "../firebase"

export const RightSideBar = () => {
    // const {rooms} = useContext(RoomDetailContext)
    // const [selectedRoom, setselectedRoom] = useState({})
    const [roomName, setRoomName] = useState("")
    const {roomId} = useParams()

    // useEffect(()=>{
    //     setselectedRoom(rooms.find((room)=>room.id === roomId))
    //     console.log(selectedRoom)
    // },[roomId])
    useEffect(() => {
        if(roomId){
            db.collection("rooms")
            .doc(roomId)
            .onSnapshot((snapshot)=>setRoomName(snapshot.data().name))
        }
    }, [roomId])

    return (
        <div className="flex flex-col flex-2 p-8 w-80 space-y-6 flex-2">
            <div className="bg-blue-50 border-2 border-indigo-50 py-4 flex flex-col items-center space-y-2 rounded-xl">
                <Avatar style={{width:'80px', height:'80px'}} src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*1000)}.svg`} />
                <div className="p-4">
                    <div className="flex space-x-2">
                        <HomeOutlinedIcon fontSize="small"/>
                        <p className="text-sm">{roomName}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

