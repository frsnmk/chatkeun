import React from 'react'
import SendIcon from '@material-ui/icons/Send'

export default function TextInput() {
    return (
        <div className="flex bg-white shadow p-3 rounded-xl space-x-2 mr-3">
            <input placeholder="Enter your message here" className="w-full px-3 h-10 border-2 border-indigo-50 rounded-md focus:outline-none focus:ring-1 ring-indigo-300"/> 
            <button className="flex bg-blue-600 h-10 px-3 items-center focus:outline-none rounded text-white hover:bg-blue-400 focus:ring-2 ring-blue-300">Send <SendIcon fontSize="small" className="ml-2"/></button>
        </div>
    )
}
