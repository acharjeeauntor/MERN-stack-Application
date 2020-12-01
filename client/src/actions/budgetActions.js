import axios from 'axios'
import {
     GET_INCLIST,
     GET_EXPLIST,
     DELETE_INCOME,
     ADD_INCOME,
     ADD_EXP,
     DELETE_EXP,
     ADD_TOTALINC,
     ADD_TOTALEXP,
     GET_ERRORS
} from './types'

export const addInc = (incData) => dispatch => {
     axios.post('/budget/income', incData)
          .then(res => 
               dispatch({
                    type: ADD_INCOME,
                    payload: res.data
               })
          )
          .catch(err => dispatch({
               type: GET_ERRORS,
               payload:err.response.data
     }))
}

export const addExp = (expData) => dispatch => {
     axios.post('/budget/exp', expData)
          .then(res=>dispatch({
                    type: ADD_EXP,
                    payload: res.data
               }))
     .catch(err => dispatch({
               type: GET_ERRORS,
               payload:err.response.data
     }))
}

export const getIncList = () => dispatch => {
     axios.get('/budget/income/getincomelist')
          .then(res => dispatch({
               type: GET_INCLIST,
               payload:res.data
          }))
     .catch(err=>console.log(err))
}

export const getExpList = () => dispatch => {
     axios.get('/budget/exp/getexplist')
          .then(res => dispatch({
               type: GET_EXPLIST,
               payload:res.data
          }))
     .catch(err=>console.log(err))
}

export const deleteAIncome = (id) => dispatch=>{
     axios.delete(`/budget/income/deleteincome/${id}`)
          .then(res => dispatch({
               type: DELETE_INCOME,
               payload:res.data
          }))
     .catch(err=>console.log(err))
}

export const deleteAExp = (id) => dispatch=>{
     axios.delete(`/budget/exp/deleteexp/${id}`)
     .then(res => dispatch({
               type: DELETE_EXP,
               payload:res.data
          }))
     .catch(err=>console.log(err))
}

export const totalInc = () => dispatch => {
     axios.get('/budget/income/getincomelist')
          .then(res => {
               var total = res.data.map(tt => tt.amount)
               var totalIncome = total.reduce((a, b) => a + b)
               dispatch({
                    type: ADD_TOTALINC,
                    payload:totalIncome
               })
          })
     .catch(err=>console.log(err))
}

export const totalExp = () => dispatch => {
     axios.get('/budget/exp/getexplist')
          .then(res => {
               var total = res.data.map(tt => tt.amount)
               var totalExp= total.reduce((a, b) => a + b)
               dispatch({
                    type: ADD_TOTALEXP,
                    payload:totalExp
               })
          })
     .catch(err=>console.log(err))
}

