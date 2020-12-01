import React from 'react'

const TextFieldGroup = ({type,placeholder,name,onChange,disabled,value,error,info,label}) => {
     return (
          <div className="form-group">
               <input
                    type={type}
                    className="form-control form-control-lg"
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
               />
               {info && <small className="form-text text-muted">{info}</small>}
               </div>
     )
}

// TextFieldGroup.propTypes = {
//      name: PropTypes.string.isRequired,
//      placeholder: PropTypes.string,
//      value: PropTypes.string.isRequired,
//      info: PropTypes.string,
//      error: PropTypes.string,
//      type: PropTypes.string.isRequired,
//      onChange: PropTypes.func.isRequired,
//      disabled: PropTypes.string
// }

// TextFieldGroup.defaultProps = {
//      type:'text'
// }


export default TextFieldGroup
