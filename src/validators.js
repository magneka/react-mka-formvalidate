export const isNotBlank = (val, name) => {
    //console.log ('is not blank', val)
    if (val) return ''
    else return `${name} is a required field.`
}

export const minLength3 = (val, name) => {
    console.log('minLength3', val.length)
    let result = ''
    if (val.length < 3)
        result = `${name} must have at least 3 characters.`
    //console.log ('validating', val, ' result: ', result)
    return result
}

export const isMKA = (val, name) => {
    //console.log ('isFilled', val)
    let result = ''
    if (val !== 'MKA')
        result = 'Feltet må inneholde "MKA"'
    //console.log ('validating', val, ' result: ', result)
    return result
}