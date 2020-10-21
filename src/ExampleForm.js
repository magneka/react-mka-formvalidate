import React, { useState } from "react";

export function ExampleForm(props) {

  //const [name, setName] = useState("");

  const [dirtyState, setDirtyState] = useState({});
  const [formState, setFormState] = useState({
    //Name: "mka",
    //Address: "rådal"
  })

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setFormState(
      (prevState => ({...prevState, [e.target.name]: e.target.value})))

    setDirtyState(
      (prevState => ({...prevState, [e.target.name]: true})))

    console.log(JSON.stringify(formState))
    console.log(JSON.stringify(dirtyState))
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

      <input type="submit" value="Submit" />
      <br/>
      {JSON.stringify(formState)}

    </form>
  );
}