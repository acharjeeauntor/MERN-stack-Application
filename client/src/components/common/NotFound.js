import React from 'react'
import Gif from '../../img/original.gif'

const NotFound = () => {
     return (
          <div className="container" style={{textAlign:"center",marginTop:'100px'}}>
          <h1 className="display-4" style={{color:"Red"}}>Page Not Found</h1>
               <h3>Sorry, This Page not Exist.</h3>
               <img src={Gif} alt="not-found" /> 
          </div>
     )
}

export default NotFound
