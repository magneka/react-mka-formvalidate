import React from "react";
import { useUcForm } from './useUcForm'
import { isNotBlank, minLength3, ValidEmailaddress, isNumber } from './validators'

export function ExampleForm(props) {

  const formValues = {
    Name: 'a',
    Address: '',
    Email: '',
    Age: ''
  }

  const formValidators = {
    Name: [ isNotBlank, minLength3 ],
    Email: [ isNotBlank,ValidEmailaddress ],
    Age: [ isNotBlank, isNumber ]  
  }

  const {
    handleChange, formState, 
    validateAll, errorMessages, 
    canBeSubmitted } = useUcForm(formValues, formValidators)

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
          value={formState['Name']}
          onChange={handleChange} />
        <br />
        <div style={isRed}>{errorMessages[props.name]}</div><br />
      </div>
     )
  }

  return (
    <form onSubmit={handleSubmit}>

      {!canBeSubmitted() && <div style={isRed}>Unable to submit data due to errors in input, please correct<br /><br /></div>}

      {renderFormField({ caption: 'First name', name:'Name', formState:formState, handleChange:handleChange })}
     
      
      <label>Address:</label><br />
      <input type="text" name="Address" value={formState.Address} onChange={handleChange} /><br />
      <div style={isRed}>{errorMessages.Address}</div><br />

      <label>Email:</label><br />
      <input type="text" name="Email" value={formState.Email} onChange={handleChange} /><br />
      <div style={isRed}>{errorMessages.Email}</div><br />

      <label>Age:</label><br />
      <input type="text" name="Age" value={formState.Age} onChange={handleChange} /><br />
      <div style={isRed}>{errorMessages.Age}</div><br />

      

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