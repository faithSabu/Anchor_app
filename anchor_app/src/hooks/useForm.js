import React, { useState } from 'react'
import { omit } from 'lodash'
import Swal from 'sweetalert2'

function useForm(formLogin) {
    //form values
    const [values, setValues] = useState({})
    //errors
    const [errors, setErrors] = useState({})
    const [formError, setFormError] = useState(false)
    let fieldEmpty = true;

    const validate = (event, name, value) => {
        switch (name) {
            case 'email':
                if (!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)) {
                    setErrors({
                        ...errors,
                        email: 'Email is not valid'
                    })
                } else {
                    //set the error state empty or remove the error tor username input

                    // omit function removes the value from given object and returns a new object
                    let newObj = omit(errors, 'email')
                    setErrors(newObj)
                }
                break;

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
            case 'username':
                if (
                    value.length < 4
                ) {
                    setErrors({
                        ...errors,
                        username: 'Username must contain minimum 4 characters'
                    })
                } else {
                    let newObj = omit(errors, 'username');
                    setErrors(newObj);
                }
                break;
            case 'password':
                if (value.length < 2) {
                    setErrors({
                        ...errors,
                        password: 'Password is not valid'
                    })
                } else {
                    let newObj = omit(errors, 'password');
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

        // Checking whether field empty or not
        if (!values.email || !values.name || !values.username || !values.password) fieldEmpty = true;
        else fieldEmpty = false;

        if (Object.keys(errors).length === 0 && Object.keys(values) != 0 && !fieldEmpty) {
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

export default useForm