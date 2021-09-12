import { createContext, useReducer } from "react"
import Reducer from "./Reducer"

const initialState = {
    user: null
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) =>{
    const [state, dispatch] = useReducer(Reducer, initialState)

    // action
    const setUserGoogleAuth = (result)=>{
        dispatch({
            type: 'SET_USER',
            payload: result.user
        })
    }
    
    return (
        <GlobalContext.Provider value={{user:state.user, setUserGoogleAuth}}>
            {children}
        </GlobalContext.Provider>
    )
}