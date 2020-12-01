import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteAExp, getExpList } from '../../actions/budgetActions'
import './css/Dashboard.css'

class ExpList extends Component {
      
       onClick = (id) => {
          this.props.deleteAExp(id)
     }
     
     render() {
        const{exp}= this.props.budget
          return (
               <div className="container">
                    <h5 style={{color:"red"}} className="mt-3">EXPENSE</h5>
                    {exp.map(exp => (
                         <p className="list" key={exp.date}>
                              <span className="item">{exp.desc}</span>
                              <span>-{exp.amount}</span>
                           <i onClick={() => this.onClick(exp._id)} className="far fa-times-circle" style={{color:"red",padding:"6px",fontSize:"21px"}}/>   
                         </p>
                    ))}
               </div>
          )
     }
}

const mapStateToProps = (state) => ({
     budget:state.budget
})

export default connect(mapStateToProps,{deleteAExp,getExpList})(ExpList)
