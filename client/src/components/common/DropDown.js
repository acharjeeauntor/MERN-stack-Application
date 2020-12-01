import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logOut } from '../../actions/authActions'
import{Link} from 'react-router-dom'

class DropDown extends Component {
       onClick = () => {
         this.props.logOut() 
     }
     
      render() {
          const{name,avatar,type}= this.props.user
          return (
             <div style={{ textAlign: "right",paddingTop: "15px"}}>
                         <div className="dropdown" data-toggle="tooltip" data-placement="left" title={name}>
 <img className="rounded-circle"src={avatar}alt={name}
          style={{ width: '50px', marginRight: '10px' }}
             id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <Link to="/" className="dropdown-item" onClick={this.onClick}><i className="fas fa-sign-out-alt"/> Log Out</Link>
     <Link to="/statement" className="dropdown-item"><i className="fas fa-list-alt"/> Show Statement</Link>
     {type==='local'?<Link to="/changepassword" className="dropdown-item"><i className="fas fa-unlock-alt"/> Change Password</Link>:null}
     <Link to="/myaccount"className="dropdown-item"><i className="fas fa-user"/> View Account</Link>
  </div>
</div>  
                   </div>
             
          )
     }
}

const mapStateToProps = (state) => ({
     user:state.auth.user
})


export default connect(mapStateToProps,{logOut})(DropDown)
