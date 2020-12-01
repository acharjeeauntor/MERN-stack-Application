import React, { Component } from 'react'
import { connect } from 'react-redux'
import{deleteAIncome,getIncList} from '../../actions/budgetActions'
import './css/Dashboard.css'
class IncomeList extends Component {

     onClick = (id) => {
          this.props.deleteAIncome(id) 
     }

     render() {
          const {income}=this.props.budget
       
          return (
               
               <div className="container">
                    <h5 style={{color:"green"}} className="mt-3">INCOME</h5>
                    {income.map(inc =>
                         <p className="list" key={inc.date}>
                              <span className="item">{inc.desc}</span>
                              <span>+{inc.amount}</span>
                           <i onClick={() => this.onClick(inc._id)} className="far fa-times-circle" style={{color:"red",padding:"6px",fontSize:"21px"}}/>   
                         </p>
                    )}
               </div>
          )
     }
}

const mapStateToProps = (state) => ({
        budget: state.budget
})


export default connect(mapStateToProps,{deleteAIncome,getIncList})(IncomeList)

