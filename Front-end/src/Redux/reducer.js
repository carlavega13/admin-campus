import { GET_COURSES, LOGIN } from "./actionTypes"

const initialState={
    user:{
        username:"",
        domain:"",
        token:""
    },
    courses:[]
}

const reducer=(state=initialState,action)=>{
switch (action.type) {
    case LOGIN:
        return {
            ...state,
            user:{
             username:action.payload.username,
             domain:action.payload.domain,
             token:action.payload.token,
            }
        }
    case GET_COURSES:
        return{
            ...state,
         courses:action.payload
        }

    default:
        return {...state}
}
}
 
export default reducer