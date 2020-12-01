import {
     GET_INCLIST,
     AUTH_LOGOUT,
     GET_EXPLIST,
     DELETE_INCOME,
     ADD_INCOME,
     ADD_EXP,
     DELETE_EXP,
     ADD_TOTALINC,
     ADD_TOTALEXP
} from '../actions/types'

const initialState = {
     income:[],
     exp: [],
     totalInc: 0,
     totalExp:0
}

export default function (state=initialState,action) {
     switch (action.type) {
          case AUTH_LOGOUT:
               return {
                    ...state,
                    income: [],
                    exp: [],
                    totalInc: 0,
                    totalExp:0
               }
          case GET_INCLIST:
               return {
                    ...state,
                  income:action.payload
               }
          case GET_EXPLIST:
               return {
                    ...state,
                  exp:action.payload 
               }
          case ADD_INCOME:
               state.income.push(action.payload)
               return {
                    ...state,
              totalInc :state.totalInc+action.payload.amount
               }
          case ADD_EXP:
               state.exp.push(action.payload)
               return {
                    ...state,
                    totalExp :state.totalExp+action.payload.amount
               }
          case DELETE_INCOME:
               return {
                    ...state,
                    income: state.income.filter(inc => inc._id !== action.payload._id),
                    totalInc:state.totalInc - action.payload.amount
               }
          case DELETE_EXP:
               return {
                    ...state,
                    exp: state.exp.filter(ex => ex._id !== action.payload._id),
                    totalExp : state.totalExp - action.payload.amount
               }
          case ADD_TOTALINC:
               return {
                    ...state,
               totalInc:action.payload
               }
          case ADD_TOTALEXP:
               return {
                    ...state,
               totalExp:action.payload
               }
         
          default:
               return state
     }
}