import { combineReducers } from 'redux'
import authReducer from './authReducer'
import budgetReducer from './budgetReducer'
import statementReducer from './statementReducer'
import errorReducer from './errorReducer'

export default combineReducers({
     auth: authReducer,
     budget: budgetReducer,
     statement: statementReducer,
     errors:errorReducer
})