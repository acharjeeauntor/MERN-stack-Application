import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStatement } from '../../actions/statementActions'
import{getCurrentUser} from '../../actions/authActions'
import DropDown from '../common/DropDown'
import{Link} from 'react-router-dom'
class Statement extends Component {
     componentDidMount() {
          this.props.getStatement()
          this.props.getCurrentUser()

     }
     render() {
          const { statement } = this.props.statement
          return (
               <div className="statement">
                    <Link to="/dashboard" className="btn btn-outline-info btn-sm mt-4 ml-4"><i className="fas fa-arrow-left"> Go to Dashboard</i></Link>
              <DropDown />
                    <div className="container" style={{ textAlign: "center" }}>
           <h4 className="mt-5 mb-4" >This is a Simple Statement</h4>
   <table className="table">
     <thead className="thead-dark">
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Income</th>
     <th scope="col">Expense</th>
     <th scope="col">Total</th>
    </tr>
  </thead>
      <tbody>
          {statement.length === 0 ? <h4 style={{color: "red",marginTop:"25px" }}
            >No statement found</h4> : statement.map(statement => (
       <tr key={statement.todayTotal}>
     <td><strong>{statement.date.toLocaleString().slice(0, 10)}</strong></td>
     <td>{statement.todayInc}</td>
     <td>{statement.todayExp}</td>
     <td>{statement.todayTotal}</td>
    </tr>
     ))}
  </tbody>
 </table>
  </div> 
          </div>
 )}}

const mapStateToProps = (state) => ({
     statement: state.statement
})

export default connect(mapStateToProps,{getStatement,getCurrentUser})(Statement)