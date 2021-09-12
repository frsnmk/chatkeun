import React, { useContext } from 'react'
import { GlobalContext} from '../context/GlobalContext'
import { auth, provider } from '../firebase'

export default function Login() {
    const {setUserGoogleAuth} = useContext(GlobalContext)
    const signIn = () =>{
        auth
        .signInWithPopup(provider)
        .then((result)=>{
            setUserGoogleAuth(result)
        })
        .catch((error)=>alert(error.message))
    }
    return (
        <div className="bg-white h-screen w-screen flex justify-center items-center">
            <div className="bg-indigo-50 w-1/2 h-3/4 rounded-xl p-5 flex flex-col items-center justify-between space-y-2 shadow-md">
                <h1 className="text-2xl font-extrabold">Login to Chatkeun App</h1>
            <img className="h-32" alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Messenger_logo_2018.svg/1200px-Facebook_Messenger_logo_2018.svg.png" />
                <button onClick={signIn} className="bg-blue-300 px-3 h-10 rounded-xl hover:bg-blue-400 focus:outline-none focus:ring ring-blue-200">Sign in With Google</button>
            </div>
        </div>
    )
}
