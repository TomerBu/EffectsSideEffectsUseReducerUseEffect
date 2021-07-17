import React, { useReducer, useState } from 'react';
import Card from '../UI/Card/Card';
import styles from './Login.module.css';
import Button from '../UI/Button/Button';

//outside the component: it does not need data from the component.
const emailReducer = (state, action) => {
  switch (action.type) {
    case "NEW_EMAIL_VALUE":
      return { email: action.payload, isValid: action.payload.includes("@") }
    case "EMAIL_BLURED":
      return { email: state.email, isValid: state.email.includes("@") }
    default:
      return { email: '', isValid: false }
  }
}

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, { email: '', isValid: null })
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {//email onInput handler
    //dispatch the state to the store
    dispatchEmail({ type: "NEW_EMAIL_VALUE", payload: event.target.value })

    setFormIsValid(emailState.isValid && enteredPassword.trim().length > 6)
  };

  const validateEmailHandler = () => {//email onBlur handler
    dispatchEmail({ type: "EMAIL_BLURED" })
  };

  const passwordChangeHandler = (event) => {//pass onInput handler
    setEnteredPassword(event.target.value);
    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
  };

  const validatePasswordHandler = () => {//pass onBlur handler
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {//form onSubmit handler
    event.preventDefault();//callback:
    props.onLogin(emailState.email, enteredPassword);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          //div wraps email input (.control.invalid > input {})
          className={`${styles.control} ${emailState.isValid === false ? styles.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${passwordIsValid === false ? styles.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
