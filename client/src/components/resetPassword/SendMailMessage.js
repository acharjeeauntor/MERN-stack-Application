import React from 'react'
import Gif from '../../img/sendmail.gif'

const SendMailMessage = () => {
     return (
         <div className="container" style={{textAlign:"center",marginTop:'100px'}}>
          <h1 className="display-4" style={{color:"Red"}}>Please Check Your Email Address..</h1>
               <h5>A Reset Password Email Send in Your Email,Please Reset Password within <b style={{color:"Red"}}>1 Hour</b></h5>
               <img className="rounded-circle" src={Gif} alt="send-mail" style={{width:"450px"}} /> 
          </div>
     )
}

export default SendMailMessage
