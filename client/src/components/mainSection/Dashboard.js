import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getCurrentUser } from '../../actions/authActions'
import { getExpList, getIncList, totalInc, totalExp } from '../../actions/budgetActions'
import{getStatement} from '../../actions/statementActions'
import IncomeList from './IncomeList'
import ExpList from './ExpList'
import Form from './Form'
import ShowBudget from './ShowBudget'
import DropDown from '../common/DropDown'
import './css/Dashboard.css'

class Dashboard extends Component {
     
 componentDidMount() {
      this.props.getIncList()
      this.props.totalInc()
      this.props.totalExp()
      this.props.getExpList()
      this.props.getStatement()
      this.props.getCurrentUser()
     }

     render() {
          return (
               <div>
                    <div className="top">
                              <DropDown />
                  <h5 className="ml-3">Available Budget in {new Date().toLocaleString().slice(0, 10)}</h5>
                    <div className="mt-2">
                         <ShowBudget />
                    </div>
                    </div>
                    <div className="bottom">
                         <div className="form">
                         <Form />
                         </div>
                     <div className="row mt-3">
                         <div className="col-6">
                              <IncomeList  />
                    </div>
                         <div className="col-6">
                              <ExpList />
                         </div>
                         </div>
                    </div>
                    
               </div>
          )
     }
}


export default connect(null,{
     getExpList,
     getIncList,
     totalInc,
     totalExp,
     getStatement,
     getCurrentUser
})(Dashboard)