import { Avatar, Fab, IconButton} from '@material-ui/core'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'
import AddIcon from '@material-ui/icons/Add'
import { useContext, useEffect, useState } from 'react'
import db from '../firebase'
import RoomChat from '../components/RoomChat'
import { RoomDetailContext } from '../context/RoomDetailContext'
import { GlobalContext } from '../context/GlobalContext'

export function LeftSideBar({showSidebar, onShowSidebar})  {
    // const {rooms} = useContext(RoomDetailContext)
    const {user} = useContext(GlobalContext)
    const [isTrue, setIsTrue] = useState(false)
    const [rooms , setRooms ] = useState([])

    
    useEffect(()=>{
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot)=>
        (setRooms(
            snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data()
            }))
            )
            ))
            return () =>{
                unsubscribe()
            }
        },[])

    const createChat = () =>{
        const roomName = prompt("Please Enter name for this room")
        if(roomName){
            db.collection("rooms").add({
                name:roomName
            })
        }
    }

    const toggleChat = () =>{
        setIsTrue(!isTrue)
    }
    return (
        <div className={`p-8 w-80 z-50 space-y-6 absolute bg-white inset-y-0 left-0 transform ${(showSidebar)?'-translate-x-full':'translate-x-0'} md:relative md:translate-x-0 transition duration-300 ease-in-out`}>
            
            {/* header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img className="w-8" alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/1200px-Facebook_Messenger_logo_2018.svg.png" />
                    <h1 className="text-xl font-extrabold">Chatkeun</h1>
                </div>
                <div className="flex py-2 px-2 md:hidden">
                    <IconButton onClick={onShowSidebar} className="focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </IconButton>
                </div>
            </div>
            {/* card information */}
            <div className="bg-blue-50 border-2 border-indigo-50 py-4 flex flex-col items-center space-y-2 rounded-xl">
                {/* <Avatar style={{width:'80px', height:'80px'}} src="https://www.anime-planet.com/images/characters/seijuurou-akashi-44547.jpg"/> */}
                <Avatar style={{width:'80px', height:'80px'}} src={user?.photoURL}/>
                <div className="flex flex-col items-center">
                <div className="flex space-x-2 items-center">
                    <h3 className="text-lg font-extrabold">{user?.displayName}</h3>
                    <SettingsOutlinedIcon fontSize="small"/>
                </div>
                <p className="text-xs text-gray-500 font-semibold">{user?.email}</p>
                </div>
            </div>
            {/* Rooms */}
            <div>
                <div className="flex justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <h3  className="">Chat Rooms</h3>
                        <div className="bg-indigo-50 w-5 h-5 flex justify-center items-center rounded-full text-sm font-bold">{rooms.length}</div>
                    </div>
                    <IconButton className="focus:outline-none" onClick={toggleChat}>
                        <ExpandMoreOutlinedIcon className={`transform ${isTrue?'rotate-0':'rotate-180'}`}/>
                    </IconButton>
                </div>
                {/* //scrollbar here */}
                <div className="max-h-80 min-h-20">
                    <div className="h-full scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-thumb-rounded-full scrollbar-track-transparent overflow-y-scroll">
                    {(isTrue)?(
                        rooms.map(room =>(
                            <RoomChat key={room.id} idRoom={room.id} srcImg={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*1000)}.svg`} roomName={room.data.name}/>
                            ))
                            )
                            : null
                        }
                    </div>
                </div> 
            </div>
            <div className="absolute bottom-10">     
                <Fab onClick={createChat} size="medium" style={{background:'#a5b4fc80'}} className="focus:outline-none" >
                    <AddIcon/>
                </Fab>
            </div>
        </div>
    )
}

// (
//     <div class="w-20 p-5 h-screen shadow-lg">
//         <button className="focus:outline-none lg:hidden">
//             <Avatar src={user?.photoURL} />
//         </button>
//     </div>
// )



// (
//     <div className="p-8 w-80 space-y-6 flex-2">
        
//         {/* header */}
//         <div className="flex items-center space-x-3">
//             <img className="w-8" alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/1200px-Facebook_Messenger_logo_2018.svg.png" />
//             <h1 className="text-xl font-extrabold">Chatkeun</h1>
//         </div>
//         {/* card information */}
//         <div className="bg-blue-50 border-2 border-indigo-50 py-4 flex flex-col items-center space-y-2 rounded-xl">
//             {/* <Avatar style={{width:'80px', height:'80px'}} src="https://www.anime-planet.com/images/characters/seijuurou-akashi-44547.jpg"/> */}
//             <Avatar style={{width:'80px', height:'80px'}} src={user?.photoURL}/>
//             <div className="flex flex-col items-center">
//             <div className="flex space-x-2 items-center">
//                 <h3 className="text-lg font-extrabold">{user?.displayName}</h3>
//                 <SettingsOutlinedIcon fontSize="small"/>
//             </div>
//             <p className="text-xs text-gray-500 font-semibold">{user?.email}</p>
//             </div>
//         </div>
//         {/* Rooms */}
//         <div>
//             <div className="flex justify-between mb-4">
//                 <div className="flex items-center space-x-2">
//                     <h3  className="">Chat Rooms</h3>
//                     <div className="bg-indigo-50 w-5 h-5 flex justify-center items-center rounded-full text-sm font-bold">{rooms.length}</div>
//                 </div>
//                 <IconButton className="focus:outline-none" onClick={toggleChat}>
//                     <ExpandMoreOutlinedIcon className={`transform ${isTrue?'rotate-0':'rotate-180'}`}/>
//                 </IconButton>
//             </div>
//             {/* //scrollbar here */}
//             <div className="max-h-80 min-h-20">
//                 <div className="h-full scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-thumb-opacity-75 scrollbar-thumb-rounded-full scrollbar-track-transparent overflow-y-scroll">
//                 {(isTrue)?(
//                     rooms.map(room =>(
//                         <RoomChat key={room.id} idRoom={room.id} srcImg={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*1000)}.svg`} roomName={room.data.name}/>
//                         ))
//                         )
//                         : null
//                     }
//                 </div>
//             </div> 
//         </div>
//         <div className="absolute z-20">     
//             <Fab onClick={createChat} size="medium" style={{background:'#a5b4fc80'}} className="focus:outline-none" >
//                 <AddIcon/>
//             </Fab>
//         </div>
//     </div>
// )