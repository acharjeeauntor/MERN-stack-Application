import React from 'react'
import classnames from 'classnames'

const SimpleInputField = ({type,placeholder,name,onChange,value,error}) => {
     return (
          <div>
        <input type={type} 
              className={classnames("form-control mx-sm-5 mb-2", {
               'is-invalid': error
                    })}
       name={name}
       value={value}
        placeholder={placeholder} 
      onChange={onChange} />
               {error && <h5 className="invalid-feedback">{error}</h5>}
               </div>
     )
}

// SimpleInputField.propTypes = {
//      name: PropTypes.string.isRequired,
//      placeholder: PropTypes.string,
//      value: PropTypes.string.isRequired,
//      info: PropTypes.string,
//      error: PropTypes.string,
//      type: PropTypes.string.isRequired,
//      onChange: PropTypes.func.isRequired,
//      disabled: PropTypes.string
// }

// SimpleInputField.defaultProps = {
//      type:'text'
// }


export default SimpleInputField
