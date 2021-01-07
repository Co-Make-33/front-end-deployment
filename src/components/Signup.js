import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import SignupSchema from '../Validation/SignupSchema';
import * as yup from 'yup';
import axios from 'axios';


const SignUpGlobal = createGlobalStyle`
* {
    color:white;
}
body {
    background-color:#242943;
}
`;

const Heading = styled.h2`
  text-align: center;
  border-bottom: 2px solid white;
  width: 90%;
  margin: 2% auto;
  padding: 1% 0;
`;

const StyledSignUp = styled.div`
  display: flex;
  margin: 0 auto;
  width: 60%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 70%;
  margin: 10% auto;
  background-color: #8d82c4;
  border-radius: 10px;
  box-shadow: 
    /* top */ rgba(255, 255, 255, 0.15) 0px -6px 10px,
    /* right */ rgba(255, 255, 255, 0.15) 6px 0px 10px,
    /* bottom */ rgba(255, 255, 255, 0.15) 0px 6px 10px,
    /* left */ rgba(255, 255, 255, 0.15) -6px 0px 10px;
  border: 1px solid mintcream;

  input {
    margin: 4% auto;
    width: 80%;
    color: black;
    border: 1px solid black;
  }

  p {
    color: black;
    margin: 0;
    text-align: center;
    font-size: 0.8rem;
  }
`;

const StyledErrors = styled.div`
  font-size: 0.75rem;
  color: black;
  text-align: center;
  margin-top: 0;
`;

const initialValues = {
  credentials: {
    email: '',
    username: '',
    password: ''
  }
};

const initialErrors = {
  email: '',
  username: '',
  password: ''
};

const initialDisabled = true;

function Signup() {
  const { push } = useHistory();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const onSubmit = (event) => {
    event.preventDefault();
    axios 
      .post('https://co-make-33.herokuapp.com/api/register', formValues.credentials)
      .then( res => {
        push('/login')

      })
      .catch( err => {
        console.log(err)
      })
  };

  const inputChange = (name, value) => {
    yup
      .reach(SignupSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: ''
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      credentials: {...formValues.credentials, [event.target.name]: event.target.value}
    })
    inputChange(name, value);
  };

  useEffect(() => {
    SignupSchema.isValid(formValues.credentials).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <>
      <SignUpGlobal />
      <Heading>Sign Up</Heading>
      <StyledSignUp>
        <StyledForm onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            value={formValues.credentials.email}
            placeholder="Email"
            onChange={handleChange}
          ></input>
          <StyledErrors>{formErrors.email}</StyledErrors>
          <input
            type="text"
            name="username"
            value={formValues.credentials.username}
            placeholder="Username"
            onChange={handleChange}
          ></input>
          <StyledErrors>{formErrors.username}</StyledErrors>
          <input
            type="password"
            name="password"
            value={formValues.credentials.password}
            placeholder="Password"
            onChange={handleChange}
          ></input>
          <StyledErrors>{formErrors.password}</StyledErrors>
          <input type="submit" disabled={disabled}></input>
          {/* <button type="submit" disabled={disabled}>
            Submit
          </button> */}
          <Link to="/Login">
            <p>Already have an account?</p>
          </Link>
        </StyledForm>
      </StyledSignUp>
    </>
  );
}

export default Signup;

//
//
//?Ask about how this user information gets passed to the backend
//This is how I have posted user info with an API in the past, does it work kinda like this?
// const postNewUser = (newUser) => {
//   axios
//     .post("https://reqres.in/api/users", newUser)
//     .then((res) => {
//       setUser([res.data, ...user]);
//       setFormValues(initialValues);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// ___👻CODING GRAVEYARD👻___
//
// const handleChange = (event) => {
//   const { email, username, password } = event.target;
//   inputChange(email, username, password);
// };
//
// const [user, setUser] = useState(initialUser);

 // const newUser = {
    //   email: formValues.email.trim(),
    //   username: formValues.username.trim(),
    //   password: formValues.password
    // };
