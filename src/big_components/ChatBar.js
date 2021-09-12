import React, { useContext, useEffect, useState } from 'react'
import BallonChat from '../components/BallonChat'
import SendIcon from '@material-ui/icons/Send'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { Avatar, IconButton } from '@material-ui/core'
import db from '../firebase'
import firebase from 'firebase/app'
import { GlobalContext } from '../context/GlobalContext'


export default function ChatBar({onShowSidebar}) {
    const {register, handleSubmit, reset} = useForm()
    const {roomId} = useParams()
    const [messages, setMessages] = useState([])
    const {user} = useContext(GlobalContext)



    useEffect(() => {
        if(roomId){
            db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
        // if(roomId){
        //     db.collection("rooms")
        //     .doc(roomId)
        //     .onSnapshot((snapshot)=>setRoomName(snapshot.data().name))
            
        // }
    }, [roomId])

    const onSubmit = (data, e) => {
        e.preventDefault()
        db.collection("rooms").doc(roomId)
        .collection("messages")
        .add({
            message: data.message,
            photoURL: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        })

        reset('', {keepValues:false})
    }


    return (                                
        <div className="flex flex-col bg-indigo-50 m-5 py-5 pl-5 pr-1 rounded-xl flex-1">
            {/* show sidebar button */}
            <div className="flex py-2 px-2 bg-indigo-50 md:hidden">
                <IconButton onClick={onShowSidebar} className="focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </IconButton>
            </div>
            <div className="h-full scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-thumb-opacity-75 scrollbar-thumb-rounded-full scrollbar-track-transparent overflow-y-scroll">
                {
                    messages.map((message, index) => (
                        // console.log(message)
                        (message.photoURL === user.photoURL)
                        ?<div key={index} className="flex flex-col items-end">
                        <div className="flex items-center mr-6">
                            <div className="flex flex-col items-end">
                            <div className="bg-indigo-900 p-3 mr-3 rounded-xl relative inline-block ">
                                <p className="text-white font-thin">{message.message}</p>
                            </div>
                                <p className="text-xs font-thin ml-3 mt-1">{new Date(message.timestamp?.toDate()).toGMTString()}</p>
                            </div>
                            <Avatar src={message.photoURL} />
                        </div>
                        </div>
                        :<div key={index} className="flex flex-col">
                            <div className="flex items-center">
                                <Avatar src={message.photoURL} />
                                <div className="">
                                    <div className="bg-white p-3 ml-3 rounded-xl relative inline-block shadow-sm">
                                        <p className="font-thin">{message.message}</p>
                                    </div>
                                    <p className="text-xs font-thin ml-3 mt-1">{new Date(message.timestamp?.toDate()).toGMTString()}</p>
                                </div>
                            </div>
                        </div>
                        ))
                }
                
            
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex bg-white shadow p-3 rounded-xl space-x-2 mr-3">
                    <input { ...register("message") } placeholder="Enter your message here" className="w-full px-3 h-10 border-2 border-indigo-50 rounded-md focus:outline-none focus:ring-1 ring-indigo-300"/> 
                    <button className="flex bg-blue-600 h-10 px-3 items-center focus:outline-none rounded text-white hover:bg-blue-400 focus:ring-2 ring-blue-300">Send <SendIcon fontSize="small" className="ml-2"/></button>
                </div>    
            </form>
        </div>
    )
}


{/* <div className="h-full scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-thumb-opacity-75 scrollbar-thumb-rounded-full scrollbar-track-transparent overflow-y-scroll">
{
    messages.map((message, index) => (
        // console.log(message)
        (message.photoURL === user.photoURL)
        ?<div key={index} className="flex flex-col items-end mr-4">
            <div clasame="flex items-center">
                <div className="flex flex-col items-end">
                    <div className="bg-indigo-900 p-3 mr-3 rounded-xl relative inline-block ">
                        <p className="text-white font-thin">{message.message}</p>
                    </div>
                    <p className="text-xs font-thin mr-3 mt-1">{new Date(message.timestamp?.toDate()).toGMTString()}</p>
                </div>
                <Avatar src={message.photoURL} />
            </div>
        </div>
        :<div key={index} className="flex flex-col">
            <div className="flex items-center">
                <Avatar src={message.photoURL} />
                <div className="">
                    <div className="bg-white p-3 ml-3 rounded-xl relative inline-block shadow-sm">
                        <p className="font-thin">{message.message}</p>
                    </div>
                    <p className="text-xs font-thin ml-3 mt-1">{new Date(message.timestamp?.toDate()).toGMTString()}</p>
                </div>
            </div>
        </div>
        ))
}


</div> */}

