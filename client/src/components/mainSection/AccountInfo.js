import React, { Component } from 'react'
import { connect } from 'react-redux'
import{Link} from 'react-router-dom'
import DropDown from '../common/DropDown'
import { deleteMyAccount,getCurrentUser } from '../../actions/authActions'
import './css/Accountinfo.css'


class AccountInfo extends Component {

     onClick = () => {
     this.props.deleteMyAccount(this.props.history)
     }
     
     componentDidMount() {
          this.props.getCurrentUser()
     }


      render() {
          const{name,email,avatar} = this.props.user
          return (
               <div className="account">
                   
          <Link to="/dashboard" className="btn btn-primary btn-sm mt-4 ml-4"><i className="fas fa-arrow-left"> Go to Dashboard</i></Link>
                    <DropDown />
                    <div className="card accountPage">
                         <div style={{textAlign:"center"}}>
                              <img src={avatar} className="card-img-top" alt={name} style={{ width: '100px' }}/>
    <div className="card-body">
      <h5>Name: <span>{name}</span></h5>
        <h5>Email: <span>{email}</span></h5>
          <button className="btn btn-danger" onClick={this.onClick}>Delete Account</button>                             
    </div>
       </div>
  </div>
               </div>
          )
     }
}


const mapStateToProps = (state) => ({
     user:state.auth.user
})

export default connect(mapStateToProps,{deleteMyAccount,getCurrentUser})(AccountInfo)