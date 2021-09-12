import { createContext, useEffect, useState } from 'react'
import db from '../firebase'



// const roomDetailState = {
//     roomDetailDatas:[
       
//     ]
// }


const RoomDetailContext = createContext()

const RoomDetailProvider = ({children}) =>{
    const [rooms , setRooms ] = useState([])
    // const [randomAvatar, setRandomAvatar] = useState("")

    // useEffect(() => {
    //     setRandomAvatar()
    // }, [])

    
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

    // // adding key and value randomAvatar to rooms
    // for (const i of rooms) {
    //     i.randomAvatar = randomAvatar
    // }

    // const getId = (id) =>{
    //     dispatch({
    //         type: 'GET_ID_DATA',
    //         payload: id
    //     })
    // }

    return (
        <RoomDetailContext.Provider value={{rooms: rooms}}>
            {children}
        </RoomDetailContext.Provider>
    )
}

export {RoomDetailContext, RoomDetailProvider}
