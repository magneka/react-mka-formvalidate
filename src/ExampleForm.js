import React, { useState } from "react";
import { useUcForm } from './useUcForm'
import { isNotBlank, isMKA, minLength3 } from './validators'

export function ExampleForm(props) {

  const formValues = {
    Name: '',
    Address: ''
  }

  const formValidators = {
    Name: [
      isNotBlank,
      minLength3
    ]
  }

  const {
    handleChange, formState, validateField,
    validateAll, errorMessages, formIsValid,
    validatorsState } = useUcForm(formValues, formValidators)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    validateAll();
    //alert(`Submitting Name ${name}`)
  }
  const isRed = { color: 'red' };

  return (
    <form onSubmit={handleSubmit}>

      {!formIsValid && <div style={isRed}>form is not valid<br /><br /></div>}

      <label>First Name:</label><br />
      <input type="text" name="Name" value={formState.Name} onChange={handleChange} />
      <div style={isRed}>{errorMessages.Name}</div><br />

      <label>Address:</label><br />
      <input type="text" name="Address" value={formState.Address} onChange={handleChange} /><br />
      <div style={isRed}>{errorMessages.Address}</div><br />

      <br />
      <input type="submit" value="Submit" />
      <br />
      <br />
      val:{JSON.stringify(formState)}<br />
      errors: {JSON.stringify(errorMessages)}<br />
      validators: {JSON.stringify(formValidators)}
      <br />

    </form>
  )
}