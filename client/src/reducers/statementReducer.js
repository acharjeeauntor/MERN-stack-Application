import{GET_STATEMENT, AUTH_LOGOUT}from '../actions/types'

const initialState = {
     statement:[]
}

export default function (state=initialState,action) {
     switch (action.type) {
          case GET_STATEMENT:
               return {
                    ...state,
                    statement:action.payload
               }
          case AUTH_LOGOUT:
               return {
               ...state,
                statement:[]   
          }
          default:
               return state
     }
}