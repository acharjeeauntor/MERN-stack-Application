import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addInc, addExp } from '../../actions/budgetActions'
import{clearErrors} from '../../actions/authActions'
import SimpleInputField from '../common/SimpleInputField'

class Form extends Component {
     state = {
          desc: '',
          amount: '',
          option: 'inc',
          errors:{}
     }
     



     onChange = (e) => {
          this.setState({[e.target.name]:e.target.value})
     }

     onClick = (e) => {
          e.preventDefault()
          const newInput = {
               desc: this.state.desc,
               amount: this.state.amount
          }
          console.log(newInput)
          if (this.state.option === 'inc') {
               this.props.addInc(newInput)
               
          } else {
               this.props.addExp(newInput)
     }
          this.setState({ desc: '', amount: '' })
          this.props.clearErrors()
     }

     onChangeOption = (e) => {
          this.setState({...this.state,option:e.target.value})
     }


     componentWillReceiveProps(nextProps) {
     if (nextProps.errors) {
      this.setState({errors:nextProps.errors})
    }
}


     render() {
          const{desc,amount}=this.state.errors
          return (
               <div>
                    <form className="form-inline"style={{marginLeft:"350px",paddingTop:"15px"}}>
                         <select onChange={this.onChangeOption}>
                              <option  value="inc">+</option>
                              <option  value="exp" >-</option>
                         </select> 
                         <SimpleInputField
            type="text" 
           placeholder="Add Description...."
          name="desc"
          value={this.state.desc}
          onChange={this.onChange}  
          error={desc}                                  
                  />
                         <SimpleInputField
            type="number" 
           placeholder="Add Value...."
          name="amount"
          value={this.state.amount}
          onChange={this.onChange}  
          error={amount}                                  
                  />
                         <i onClick={this.onClick} className="far fa-check-circle" style={{color:"green",padding:"6px",fontSize:"24px"}}/>
                    </form>
               </div>
          )
     }
}

const mapStateToProps = (state) => ({
     errors:state.errors
})
export default connect(mapStateToProps,{addInc,addExp,clearErrors})(Form)