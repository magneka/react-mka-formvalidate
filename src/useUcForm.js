import { useState } from "react";

export const useUcForm = (initialValues, validators) => {
    const [formState, setFormState] = useState(initialValues)
    const [validatorsState, setValidatorsState] = useState(validators);

    const [formIsValid, setFormIsValid] = useState(true)
    const [errorMessages, setErrorMessages] = useState({});

    // **********************************************************************
    // Routine validates one field, iterating over all it validator functions
    // **********************************************************************
    const validateField = (fieldName, fieldValue) => {
        console.log(fieldName, fieldValue, validatorsState[fieldName])

        setFormIsValid(true)

        if (validatorsState[fieldName]) {

            let fieldErrors = validatorsState[fieldName].reduce((errors, valFunc) => {

                // Avoid errors if a prop in valiators is not a function  
                if (typeof valFunc == 'function') {
                    return errors = `${errors}${valFunc(fieldValue, fieldName)} `
                }

            }, '')

            if (fieldErrors !== null && fieldErrors.trim() !== '') {
                setFormIsValid(false)
            }

            setErrorMessages(
                (prevState => ({ ...prevState, [fieldName]: fieldErrors })))
        }
    }

    // *********************************************************************
    // Routine validates all fields, to check if form can be submitted
    // *********************************************************************
    const validateAll = () => {
        console.log('Check if all fields are OK')
        let hasErrors = false;

        for (const fieldName of Object.keys(formState)) {
            const fieldValue = formState[fieldName];
            console.log('Check:', fieldName, fieldValue)

            validateField(fieldName, fieldValue)
        }
    }

    // *********************************************************************
    // Routine for use on inputfields onChange event
    // *********************************************************************
    const handleChange = (e) => {

        setFormIsValid(true)

        // Get name and input
        let fieldName = e.target.name
        let fieldValue = e.target.value

        validateField(fieldName, fieldValue)

        setFormState(
            (prevState => ({ ...prevState, [fieldName]: fieldValue })))

    }

    // *********************************************************************
    //
    // *********************************************************************
    const canBeSubmitted = () => {

    }


    return { handleChange, formState, validateField, validateAll, errorMessages, formIsValid, validatorsState }
}