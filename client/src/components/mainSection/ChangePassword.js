import React, { Component } from 'react'
import DropDown from '../common/DropDown'
import { connect } from 'react-redux'
import{Link} from 'react-router-dom'
import { changePassword,getCurrentUser} from '../../actions/authActions'
import SimpleInputField from '../common/SimpleInputField'
import './css/ChangePassword.css'

class ChangePassword extends Component {
 state={
      oldpassword:'',
      newpassword:'',
      confirmpassword: '',
      errors:{}
 }


     onChange = (e) => {
          this.setState({
          [e.target.name]:e.target.value
     }) 
     }
     onSubmit = (e) => {
          e.preventDefault()
          const newData = {
               oldPassword: this.state.oldpassword,
               newPassword:this.state.newpassword,
               confirmPassword:this.state.confirmpassword
          }
          this.props.changePassword(newData,this.props.history)
     }
      componentDidMount() {
          this.props.getCurrentUser()
     }
     componentWillReceiveProps(nextProps) {
          if (nextProps.errors) {
               this.setState({ errors: nextProps.errors })
          }
     }
      render() {
           const { oldPassword, newPassword, confirmPassword } = this.state.errors
           const {oldpassword, newpassword, confirmpassword} = this.state
           
          return (
               <div className="changepass">
                    <Link to="/dashboard" className="btn btn-info btn-sm mt-4 ml-4"><i className="fas fa-arrow-left"> Go to Dashboard</i></Link>
                    <DropDown />
               
                    <div className="row" style={{marginLeft:"400px",marginTop:"70px"}}>
<div className="col-sm-7">
    <div className="card" style={{textAlign:'center'}}>
      <div className="card-body">
   <h5 className="card-title">Change Password</h5>
        <form onSubmit={this.onSubmit}>
           <div className="form-group form-inline ">
<SimpleInputField
            type="password" 
           placeholder="Enter Old Password"
          name="oldpassword"
          value={oldpassword}
          onChange={this.onChange}  
          error={oldPassword}                                  
                  />
           <SimpleInputField
            type="password" 
           placeholder="Enter New Password"
          name="newpassword"
          value={newpassword}
          onChange={this.onChange}  
          error={newPassword}                                  
                          />
               <SimpleInputField
            type="password" 
           placeholder="Confirm Password"
          name="confirmpassword"
          value={confirmpassword}
          onChange={this.onChange}  
          error={confirmPassword}                                  
           />
 <button className="btn btn-success" style={{marginLeft:"90px"}}>Change Password</button>
  </div>
</form>
      </div>
    </div>
  </div>
 </div>
</div>
          )
     }
}

const mapStateToProps = (state) => ({
     errors:state.errors
})

export default connect(mapStateToProps,{changePassword,getCurrentUser})(ChangePassword)