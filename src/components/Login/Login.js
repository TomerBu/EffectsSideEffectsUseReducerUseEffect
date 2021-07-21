import React, { useContext, useEffect, useReducer, useState } from 'react';
import Card from '../UI/Card/Card';
import styles from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context';
 

//outside the component: it does not need data from the component.
const emailReducer = (state, action) => {
  switch (action.type) {
    case "NEW_EMAIL_VALUE":
      return { email: action.payload, isValid: action.payload.includes("@") }
    case "EMAIL_BLURRED":
      return { email: state.email, isValid: state.email.includes("@") }
    default:
      return { email: '', isValid: false }
  }
}

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "NEW_PASS_VALUE":
      return { password: action.payload, isValid: action.payload.length > 6 }
    case "PASS_BLURRED":
      return { password: state.password, isValid: state.password.length > 6 }
    default:
      return { password: '', isValid: false }
  }
}

const Login = () => {
  const ctx = useContext(AuthContext)
  const [emailState, dispatchEmail] = useReducer(emailReducer, { email: '', isValid: null })
  const [passState, dispatchPass] = useReducer(passwordReducer, { password: '', isValid: null })
  const [formIsValid, setFormIsValid] = useState(false);

  const {isValid: emailIsValid} = emailState
  const {isValid: passIsValid} = passState

  useEffect(()=>{
    const id = setTimeout(()=>{
      setFormIsValid(emailIsValid && passIsValid)
    }, 500)

    //cleanup func:
    return ()=>{
      clearTimeout(id)
    }
  }, [emailIsValid, passIsValid])

  const emailChangeHandler = (event) => {//email onInput handler
    dispatchEmail({ type: "NEW_EMAIL_VALUE", payload: event.target.value })
  };

  const passwordChangeHandler = (event) => {//pass onInput handler
    dispatchPass({type:"NEW_PASS_VALUE", payload: event.target.value})
  };
  
  const validateEmailHandler = () => {//email onBlur handler
    dispatchEmail({ type: "EMAIL_BLURRED" })
  };

  const validatePasswordHandler = () => {//pass onBlur handler
    dispatchPass({type: "PASS_BLURRED"})
    //setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {//form onSubmit handler
    event.preventDefault();//callback:
    ctx.loginHandler(emailState.email, passState.password)
    //props.onLogin(emailState.email, passState.password);
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
          className={`${styles.control} ${passState.isValid === false ? styles.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.password}
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
