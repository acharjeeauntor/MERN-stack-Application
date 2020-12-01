import axios from 'axios'
import { AUTH_LOGIN,GET_ERRORS,AUTH_LOGOUT,GET_CURRENTUSER, CLEAR_ERRORS } from './types'
import setAuthToken from '../utils/setAuthToken'

export const registerUser = (userData,history) => dispatch => {
     axios.post('/users/register', userData)
          .then(res => {
          history.push('/login')
     })
       .catch(err => {
         dispatch({
           type: GET_ERRORS,
           payload:err.response.data
       })
     })
}

//Login -Get user token
export const loginUser = (userData) => dispatch => {
  axios.post('/users/login', userData)
    .then(res => {
       //save to local storage
      const { token } = res.data
      //set token to LS
      localStorage.setItem('jwtToken', token)
      //set token to auth header
      setAuthToken(token)
       
      dispatch({
                    type: AUTH_LOGIN,
                    payload:token
               })
    })
       .catch(err => {
            dispatch({
                 type: GET_ERRORS,
                 payload: err.response.data
            })
       }
    )
}


export const oauthGoogle = (data,history) =>dispatch=> {
     axios.post('/users/oauth/google', {
          access_token:data
     })
       .then(res => {     
         //save to local storage
      const { token } = res.data
      //set token to LS
      localStorage.setItem('jwtToken', token)
      //set token to auth header
         setAuthToken(token)
         
               dispatch({
               type: AUTH_LOGIN,
               payload:token
               })
               history.push('/dashboard')
       })
     .catch(err=>console.log(err))
}

export const oauthFacebook = (data,history) =>dispatch=> {
     axios.post('/users/oauth/facebook', {
          access_token:data
     })
          .then(res => {     
         //save to local storage
      const { token } = res.data
      //set token to LS
      localStorage.setItem('jwtToken', token)
      //set token to auth header
         setAuthToken(token)
         
               dispatch({
               type: AUTH_LOGIN,
               payload:token
               })
               history.push('/dashboard')
       })
     .catch(err=>console.log(err))
}


export const currentUser = (data) =>dispatch=> {
     dispatch({
          type: AUTH_LOGIN,
      payload: data
     })
}

export const logOut = () => dispatch => {
     localStorage.removeItem('jwtToken') 
     axios.defaults.headers.common['Authorization'] =''
     dispatch({
          type: AUTH_LOGOUT,
          payload:''
     })
}

export const getCurrentUser = () => dispatch => {
     axios.get('/users/current')
          .then(res => dispatch({
               type: GET_CURRENTUSER,
               payload:res.data
          }))
     .catch(err=>console.log(err))
}

export const changePassword=(newData,history)=>dispatch=>{
     axios.post('/users/changepassword',newData)
     .then(res=>{
         dispatch({
          type:AUTH_LOGOUT,
          payload:''
     })
     history.push('/')
     }
          )
          .catch(err => dispatch({
               type: GET_ERRORS,
               payload:err.response.data
     }))
}

export const resetPassword=(newData,history)=>dispatch=>{
     axios.post('/users/resetpassword',newData)
          .then(res => {
               history.push('/sendmailmessage')
     })
          .catch(err => dispatch({
               type: GET_ERRORS,
               payload:err.response.data
     }))
}

export const clearErrors=()=>dispatch=>{
     dispatch({
          type:CLEAR_ERRORS
     })
}

export const sendNewPassword = (userData,history) =>dispatch=> {
     axios.post('/users/reset/setnewpassword', userData)
          .then(res => {
               // dispatch({
               // type: GET_ERRORS,
               // payload:{resetToken:"Successfully Reset Password"}
               // })
              history.push('/login')
               
     })
          .catch(err => 
          dispatch({
               type: GET_ERRORS,
               payload:err.response.data
     })
     )
}

export const deleteMyAccount = (history) =>dispatch=> {
     axios.delete('/users/deletemyaccount')
          .then(res => {
               dispatch({
               type: AUTH_LOGOUT,
               payload:''
               })
              history.push('/')
               
     })
          .catch(err => console.log(err))
}