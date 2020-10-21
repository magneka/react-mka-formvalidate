import React, { useState } from "react";

export function ExampleForm(props) {

  //const [name, setName] = useState("");
  
  const [dirtyState, setDirtyState] = useState({});
  const [formState, setFormState] = useState({
    //Name: "mka",
    //Address: "rådal"
  })

  const isFilled = (val) => {
    console.log ('validating', val)
    let result = 'OK'
    if (new String(val).valueOf() !== new String('MKA').valueOf()) 
      result = 'Navn ikke mka'
    console.log ('validating', val, ' res;', result)
    return result
  }
  const [validatorsState, setValidatorsState] = useState({
    Name: [
      () => {isFilled(() => formState.Name)}
      ]
  });

  const handleChange = (e) => {
    //console.log(e.target.name);
    //console.log(e.target.value);

    let fieldName = e.target.name
    let fieldValue = e.target.value

    setFormState(
      (prevState => ({...prevState, [fieldName]: fieldValue})))

    setDirtyState(
      (prevState => ({...prevState, [fieldName]: true})))

    let validators = validatorsState[fieldName]
    validatorsState.Name[0]()
    console.log (validators)
    

    //console.log(JSON.stringify(formState))
    //console.log(JSON.stringify(dirtyState))
  }
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Submitting Name ${name}`)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Frirst Name:
        <input
          type="text"
          name="Name"
          value={formState.Name}
          onChange={handleChange}
        />
      </label>

      <br/>

      <label>
        Adresss:
        <input
          type="text"
          name="Address"
          value={formState.Address}
          onChange={handleChange}
        />
      </label>
      
      <br/>
      <input type="submit" value="Submit" />
      <br/>
      {JSON.stringify(formState)}
      {JSON.stringify(dirtyState)}
      {JSON.stringify(validatorsState)}
      <br />
      //val:{validatorsState.Name[0]()}

    </form>
  );
}