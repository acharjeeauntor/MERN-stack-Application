import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
//import PropTypes from 'prop-types'
import { loginUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'
import Social from '../layout/Social'
import ShowError from '../common/ShowError'
import './auth.css'


class Login extends Component {
     state = {
          email: '',
          password: '',
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
               email: this.state.email,
               password:this.state.password
          }
          this.props.loginUser(userData)
          this.setState({
          password: ''
          })
     }

     componentWillReceiveProps(nextProps) {
          if (nextProps.auth.isAuthenticated) {
              this.props.history.push('/dashboard')
          }
          if (nextProps.errors) {
               this.setState({errors:nextProps.errors})
          }
    }


     render() {
          const { errors } = this.state
          return (
               
                    <div className="container">
            <Link to="/" className="btn btn-outline-success btn-sm mt-5"><i className="fas fa-arrow-left"> Home</i></Link>
      <div className="row">
                              <div className="signin">    
                                  
          <h1 className="display-4 text-center">Sign In</h1>
         <p className="lead text-center">Sign in to your  account</p>      
             <ShowError error={errors}/>
     <form onSubmit={this.onSubmit} className="form-content">
         <TextFieldGroup
            type="email" 
           placeholder="Enter your Email Address"
        name="email"
        value={this.state.email}
          onChange={this.onChange}                                   
            /> 
         <TextFieldGroup
            type="password" 
           placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}                                   
           /> 
            <input type="submit" className="btn btn-primary btn-block mt-2" />
 </form>
       <Link to="/resetpassword">Forget Password</Link> 
              <p style={{ textAlign: 'center', marginTop: "10px" }}>Don’t have an account? <Link to="/register">Sign Up</Link></p>                      
            <div className="ml-2">
          <Social />
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
     auth: state.auth,
     errors:state.errors
})

export default connect(mapStateToProps,{loginUser})(Login)
