import React from 'react'

const ShowError = ({error}) => {
     return (
          <div>
      
               {error.password && <div className="alert alert-danger alert-dismissible fade show" role="alert">
  <strong></strong> {error.password}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
               </div>}


               {error.email&&<div className="alert alert-warning alert-dismissible fade show" role="alert">
  <strong></strong> {error.email}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
               </div>}
               
               {error.name && <div className="alert alert-warning alert-dismissible fade show" role="alert">
  <strong></strong> {error.name}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
               </div>}
               
               {error.success && <div className="alert alert-success alert-dismissible fade show" role="alert">
  <strong></strong> {error.success}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
      </div>}
      
               
               {error.password2 && <div className="alert alert-danger alert-dismissible fade show" role="alert">
  <strong></strong> {error.password2}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
         </div>}
         

         {error.newPassword && <div className="alert alert-danger alert-dismissible fade show" role="alert">
  <strong></strong> {error.newPassword}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
         </div>}
         


         {error.confirmPassword && <div className="alert alert-danger alert-dismissible fade show" role="alert">
           <strong></strong> {error.confirmPassword}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
         </div>}
         
         {error.resetToken && <div className="alert alert-info alert-dismissible fade show" role="alert">
           <strong></strong> {error.resetToken}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
      </div>}
         
         
          </div>
     )
}

export default ShowError
