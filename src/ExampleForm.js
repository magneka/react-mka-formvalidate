import React from "react";
import { useUcForm } from './useUcForm'
import { isNotBlank, minLength3, ValidEmailaddress, isNumber } from './validators'

export function ExampleForm(props) {

  const formValues = {
    Name: '',
    Address: '',
    Email: '',
    Age: ''
  }

  const formValidators = {
    Name: [ isNotBlank, minLength3 ],
    Email: [ isNotBlank,ValidEmailaddress ],
    Age: [ isNotBlank, isNumber ]  
  }

  const { handleChange, formState, validateAll, errorMessages, canBeSubmitted }
    = useUcForm(formValues, formValidators)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    validateAll();
    //alert(`Submitting Name ${name}`)
  }
  const isRed = { color: 'red' };

  const renderFormField = (props) => {
    
    return (
      <div>
        <label>{props.caption}:</label><br />
        <input           
          type="text"         
          name={props.name}
          value={formState[props.name]}
          onChange={handleChange} />
        <br />
        <div style={isRed}>{errorMessages[props.name]}</div><br />
      </div>
     )
  }

  return (
    <form onSubmit={handleSubmit}>

      {!canBeSubmitted() && <div style={isRed}>Unable to submit data due to errors in input, please correct<br /><br /></div>}

      {renderFormField({ caption: 'Full name', name: 'Name' })}
      {renderFormField({ caption: 'Home Address', name: 'Address'})}
      {renderFormField({ caption: 'Email address', name: 'Email'})}
      {renderFormField({ caption: 'Users Age', name: 'Age'})}
     
      <br />
      <input type="submit" value="Submit" />
      <br />
      <br />
      val:{JSON.stringify(formState)}<br />
      errors: {JSON.stringify(errorMessages)}<br />      
      <br />

    </form>
  )
}