import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import db from '../firebase'

export default function RoomChat({idRoom, roomName, srcImg}) {
    const [lastMessage, setLastMessage] = useState([])
    useEffect(()=>{
        if(idRoom){
            db.collection("rooms")
            .doc(idRoom)
            .collection("messages")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>
                setLastMessage(snapshot.docs.map((doc)=> doc.data()))
            )
            // console.log(lastMessage)
        }
    },[idRoom])
    return (
        <NavLink  activeClassName="bg-indigo-50" className="flex items-center rounded-lg p-2 space-x-3 mx-3" to={`/rooms/${idRoom}`}>
            <div className="flex items-center rounded-lg p-2 space-x-3">
                <Avatar src={srcImg} />
                <div>
                    <p>{roomName}</p>
                    <p className="text-xs text-gray-300">{lastMessage[0]?`${lastMessage[0].message.substring(0,20)}...`:''}</p>
                </div>
            </div>
        </NavLink>
    )
}
