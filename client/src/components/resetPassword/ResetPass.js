import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { resetPassword,clearErrors } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import ShowError from '../common/ShowError'


class ResetPass extends Component {
     state = {
          email: '',
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
               email: this.state.email
          }
          this.props.resetPassword(userData,this.props.history)
          this.setState({ email: '' })
          this.props.clearErrors()
         
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
            <Link to="/" className="btn btn-outline-success btn-sm mt-5"><i className="fas fa-arrow-left"> Home</i></Link>
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Reset Your Password</h1>
            <ShowError error={this.state.errors}/>  
     <form onSubmit={this.onSubmit}>
         <TextFieldGroup
            type="email" 
           placeholder="Enter your Email Address"
        name="email"
        value={this.state.email}
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

export default connect(mapStateToProps,{resetPassword,clearErrors})(ResetPass)
