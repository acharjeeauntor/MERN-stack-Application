import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { registerUser } from '../../actions/authActions'
import Social from '../layout/Social'
//import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import ShowError from '../common/ShowError'
import './auth.css'



class Register extends Component {
     state = {
          name: '',
          email: '',
          password: '',
          password2: '',
          errors:{}
      }

     
     
onChange=(e)=>{
this.setState({
     [e.target.name]:e.target.value
})
  }
  
onSubmit=(e)=>{
  e.preventDefault()
     const newUser = {
          name:this.state.name,
          email:this.state.email,
          password:this.state.password,
          password2:this.state.password2
     }

  this.props.registerUser(newUser,this.props.history)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors:nextProps.errors})
    }
  }
  
       

  render() {
    const { errors } = this.state;
          return (
              
              <div className="container">
            <Link to="/" className="btn btn-outline-success btn-sm mt-5"><i className="fas fa-arrow-left"> Home</i></Link>
      <div className="row">
                  <div className="signup">
          <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your account</p>
                    <ShowError error={errors}/>
                    <form onSubmit={this.onSubmit}>
            <TextFieldGroup
                        placeholder="Enter your Name "
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
              />
                        <TextFieldGroup
                          type="email"
                          placeholder="Enter your Email Address"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          
                          info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
              /> 
         <TextFieldGroup
            type="password" 
           placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}  
                                          
                      />
           <TextFieldGroup
            type="password" 
           placeholder="Confirm Password"
          name="password2"
          value={this.state.password2}
          onChange={this.onChange}  
                                          
           /> 
            <input type="submit" className="btn btn-primary btn-block mt-2" />
                    </form>
               <p style={{ textAlign: 'center', marginTop: "10px" }}>Already have an account? <Link to="/login">Sign In</Link></p>  
            <div className="ml-2">
          <Social />
               </div>
        </div>
      </div>
    </div>
  
          )
     }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors:state.errors
})

 export default connect(mapStateToProps,{registerUser})(Register)

