import {AUTH_LOGIN,AUTH_LOGOUT,GET_CURRENTUSER} from '../actions/types'

const initialState = {
     isAuthenticated:false,
     token: '',
     user:{}
}

export default function (state=initialState,action) {
     switch (action.type) {
          case AUTH_LOGIN:
               return {
                    ...state,
                    isAuthenticated: true,
                    token:action.payload
               }
          case AUTH_LOGOUT:
               return {
                    ...state,
                    isAuthenticated: false,
                    token: action.payload,
                    user:{}
               }
          case GET_CURRENTUSER:
               return {
                    ...state,
                    user:action.payload
               }
          default:
               return state
     }
}