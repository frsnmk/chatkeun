export default  (state, action) =>{
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        
        case 'SET_SHOW_SIDEBAR':
            return{
                ...state,
                showSidebar: !action.payload
            }
    
        default:
            return state
    }
}