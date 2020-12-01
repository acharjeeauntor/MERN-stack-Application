import React, { Component } from 'react'
import { connect } from 'react-redux'
import './css/ShowBudget.css'

 class ShowBudget extends Component {
      render() {
           let { totalInc, totalExp } = this.props.totalBudget
           let total = totalInc - totalExp
          return (
               <div className="container">
                    {total > 0 ? <h2>+{total}</h2> : <h2>{total}</h2>}
               <div className="mt-2">
                         <p className="inc">INCOME<span style={{marginLeft:'100px'}}><b>+</b>{totalInc}</span> </p>
                         <p className="exp">EXPENSES<span style={{marginLeft:'120px'}}><b>-</b>{totalExp}</span></p>
                    </div>
                    </div>
          )
     }
}

const mapStateToProps = (state) => ({
     totalBudget: state.budget
})

export default connect(mapStateToProps)(ShowBudget)
