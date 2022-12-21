import React, { useState } from 'react'
import { omit } from 'lodash'
import Swal from 'sweetalert2'

function useFormProfileUpdate(formLogin) {
    //form values
    const [values, setValues] = useState({})
    //errors
    const [errors, setErrors] = useState({})
    const [formError, setFormError] = useState(false)

    const validate = (event, name, value) => {
        switch (name) {
            case 'name':
                if (
                    !new RegExp(/^[a-zA-Z ]*$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        name: 'Name must not contain any numbers or special characters'
                    })
                } else {
                    let newObj = omit(errors, 'name');
                    setErrors(newObj);
                }
                break;
  
            case 'phone':
                if (
                    !new RegExp(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).test(value)
                ) {
                    setErrors({
                        ...errors,
                        phone: 'Phone Number is not valid'
                    })
                } else {
                    let newObj = omit(errors, 'phone');
                    setErrors(newObj);
                }
                break;
                case 'bio':
                    if (value.length<10  ) {
                        setErrors({
                            ...errors,
                            bio: 'Must contain minimum 10 characters'
                        })
                    } else {
                        let newObj = omit(errors, 'bio');
                        setErrors(newObj);
                    }
                    break;

            default:
                break;
        }
    }

    //method to handle form inputs
    const handleChange = (event) => {
        setFormError(false)
        let name = event.target.name
        let value = event.target.value

        validate(event, name, value)

        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handlesubmit');

        console.log(Object.keys(errors).length,Object.keys(values));
        console.log(errors);

        if (Object.keys(errors).length === 0 && Object.keys(values) != 0 ) {
            setFormError(false)
            formLogin()
        } else {
            setFormError(true)
        }

    }

    return {
        values, errors, formError, handleChange, handleSubmit
    }
}

export default useFormProfileUpdate