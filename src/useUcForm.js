import { useState } from "react";

export const useUcForm = (initialValues, validators) => {
    const [formState, setFormState] = useState(initialValues)
    const [validatorsState] = useState(validators);
    const [errorMessages, setErrorMessages] = useState({});

    // **********************************************************************
    // Routine validates one field, iterating over all it validator functions
    // **********************************************************************
    const validateField = (fieldName, fieldValue) => {
        console.log(fieldName, fieldValue, validatorsState[fieldName])

        if (validatorsState[fieldName]) {

            let fieldErrors = validatorsState[fieldName].reduce((errors, valFunc) => {

                // Avoid errors if a prop in valiators is not a function  
                if (typeof valFunc == 'function') {
                    return errors = `${errors}${valFunc(fieldValue, fieldName)} `
                }
                else {
                    return errors
                }

            }, '')

            setErrorMessages(
                (prevState => ({ ...prevState, [fieldName]: fieldErrors })))
        }
    }

    // *********************************************************************
    // Routine validates all fields, to check if form can be submitted
    // *********************************************************************
    const validateAll = () => {
        //console.log('Check if all fields are OK')        

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

        //console.log('handleChange', e.target.name, e.target.value)

        // Get name and input
        let fieldName = e.target.name
        let fieldValue = e.target.value

        validateField(fieldName, fieldValue)

        canBeSubmitted()

        setFormState(
            (prevState => ({ ...prevState, [fieldName]: fieldValue })))

    }

    // *********************************************************************
    // Check if there ara non empty values in errorMessages state object
    // *********************************************************************
    const canBeSubmitted = () => {
        let result = true
        for (const fieldName of Object.keys(errorMessages)) {

            if (errorMessages[fieldName].trim() !==  '')
                result = false;
        }
        return result
    }

    return { handleChange, formState, validateAll, errorMessages, canBeSubmitted }
}