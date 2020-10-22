import React, { useState } from "react";

export function ExampleForm(props) {

  //const [name, setName] = useState("");
  
  //const [dirtyState, setDirtyState] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [formState, setFormState] = useState({
    Name: '',
    Address: ''
  })

  const isNotBlank= (val, name) => {
    //console.log ('is not blank', val)
    if (val) return '' 
    else return 'Feltet påkrevd. '
  } 
  const isFilled = (val, name) => {
    //console.log ('isFilled', val)
    let result = ''
    if (val !== 'MKA')    
      result = 'Feltet må inneholde "MKA"'
    //console.log ('validating', val, ' result: ', result)
    return result
  }

  const [validatorsState, setValidatorsState] = useState({
    Name: [
      isFilled,
      isNotBlank
      ]
  });

  const validateField = (fieldName, fieldValue) => {

    if (validatorsState[fieldName]) {
      let fieldErrors = validatorsState[fieldName].reduce((errors, valFunc) =>{
        return errors = `${errors}${valFunc(fieldValue, fieldName)} `
      }, '')
      
      setErrorMessages(
        (prevState => ({...prevState, [fieldName]: fieldErrors})))
    }
  }

  const handleChange = (e) => {
    
    // Get name and input
    let fieldName = e.target.name
    let fieldValue = e.target.value

    validateField(fieldName, fieldValue)   
    // If field has validators run them all
    /*
    if (validatorsState[fieldName]) {
      let fieldErrors = validatorsState[fieldName].reduce((errors, valFunc) =>{
        return errors = `${errors}${valFunc(fieldValue, fieldName)} `
      }, '')
      
      setErrorMessages(
        (prevState => ({...prevState, [fieldName]: fieldErrors})))
    }*/

    setFormState(
      (prevState => ({...prevState, [fieldName]: fieldValue})))

    //setDirtyState(
    //  (prevState => ({...prevState, [fieldName]: true})))

  }

  

  const validateAll = () => {
    console.log('Check if all fields are OK')
    let hasErrors = false;

    for (const fieldName of Object.keys(formState)) {
      const fieldValue = formState[fieldName];
      console.log('Check:', fieldName, fieldValue)

      validateField(fieldName, fieldValue)      
    }
   
  }

  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      validateAll();
      //alert(`Submitting Name ${name}`)
  }
  return (
    <form onSubmit={handleSubmit}>

      <label>First Name:</label><br/>
      <input type="text" name="Name" value={formState.Name} onChange={handleChange}/>
      {errorMessages.Name}<br/>

      <label>Address:</label><br/>
      <input type="text" name="Address" value={formState.Address} onChange={handleChange} /><br/>
      
      <br/>
      <input type="submit" value="Submit" />
      <br/>
      <br/>
      val:{JSON.stringify(formState)}<br/>      
      errors: {JSON.stringify(errorMessages)}<br/>      
      <br />
      

    </form>
  );
}