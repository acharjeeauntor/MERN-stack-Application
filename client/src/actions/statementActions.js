import{ ADD_STATEMENT,GET_STATEMENT} from './types'
import axios from 'axios'

export const addStatement = () => dispatch => {
     axios.delete('/statement')
          .then(res => {
               dispatch({
                    type: ADD_STATEMENT
               })
          })
}

export const getStatement = () => dispatch => {
     axios.get('/statement/mystatement')
          .then(res => dispatch({
               type: GET_STATEMENT,
               payload:res.data
     }))
     .catch(err=>console.log(err))
}