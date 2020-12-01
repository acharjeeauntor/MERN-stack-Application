import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendNewPassword,clearErrors } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import ShowError from '../common/ShowError'


class ResetPass extends Component {
     state = {
          newPassword: '',
          confirmPassword: '',
          token:'',
          errors:{}
     }



     onChange = (e) => {
          this.setState({
          [e.target.name]:e.target.value
     }) 
     }
     onSubmit = (e) => {
          e.preventDefault()
          const userData = {
               newPassword: this.state.newPassword,
               confirmPassword: this.state.confirmPassword,
               token:this.state.token
          }
          this.props.sendNewPassword(userData,this.props.history)
          this.setState({ newPassword: '',
          confirmPassword: '',
          token:'',})
          this.props.clearErrors()
     }

     componentDidMount() {
          const token = this.props.match.params.token
          console.log(token)
          this.setState({token:token})
     }

     componentWillReceiveProps(nextProps) {
          if (nextProps.errors) {
               this.setState({errors:nextProps.errors})
          }
     }


     render() {
          
           return (
               <div className="login">
                    <div className="container">
            
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Set Your new Password</h1>
            <ShowError error={this.state.errors}/>  
     <form onSubmit={this.onSubmit}>
         <TextFieldGroup
            type="password" 
           placeholder="Enter New Password"
        name="newPassword"
        value={this.state.newPassword}
          onChange={this.onChange}   
                                            
                  />
            <TextFieldGroup
            type="password" 
           placeholder="Confirm New Password"
        name="confirmPassword"
        value={this.state.confirmPassword}
          onChange={this.onChange}   
                                           
            />
           <button className="btn btn-info btn-block mt-4"> Reset Password</button>
          </form>             
        </div>
      </div>
    </div>
  </div>
          )
     }
}


// Login.propTypes = {
//      loginUser: PropTypes.func.isRequired,
//      auth: PropTypes.object.isRequired,
//      errors:PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
     errors:state.errors
})

export default connect(mapStateToProps,{sendNewPassword,clearErrors})(ResetPass)
