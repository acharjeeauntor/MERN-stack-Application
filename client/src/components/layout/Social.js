import React,{Component} from 'react'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { oauthFacebook, oauthGoogle } from '../../actions/authActions'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

class Social extends Component{
       responseGoogle = (res) => {
               this.props.oauthGoogle(res.accessToken,this.props.history)
     }
     responseFacebook = (res) => {
               this.props.oauthFacebook(res.accessToken,this.props.history)
     }
  render() {
    return (
      <div className="social">
           
<div className="text-center">
            <div className="mb-3">
           sign up using third-party services
            </div>
            <FacebookLogin
              appId="536936917069216"
              textButton="Facebook"
               fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="btn btn-success"
            />
            <GoogleLogin 
              clientId="771294463348-dp7540po6msgu4dvec1ninj2lfiuofne.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
             className="btn ml-2"
            />
            
          </div>
         </div>  
    )
  }
}




export default connect(null,{oauthFacebook,oauthGoogle})(withRouter(Social))