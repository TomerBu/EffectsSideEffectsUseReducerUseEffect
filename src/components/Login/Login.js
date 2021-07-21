import React, { useContext, useEffect, useReducer, useState, useRef } from 'react';
import Card from '../UI/Card/Card';
import styles from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/auth-context';
import Input from '../UI/Input/Input'

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

  const { isValid: emailIsValid } = emailState
  const { isValid: passIsValid } = passState
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  useEffect(() => {
    const id = setTimeout(() => {
      setFormIsValid(emailIsValid && passIsValid)
    }, 500)

    //cleanup func:
    return () => {
      clearTimeout(id)
    }
  }, [emailIsValid, passIsValid])

  const emailChangeHandler = (event) => {//email onInput handler
    dispatchEmail({ type: "NEW_EMAIL_VALUE", payload: event.target.value })
  };

  const passwordChangeHandler = (event) => {//pass onInput handler
    dispatchPass({ type: "NEW_PASS_VALUE", payload: event.target.value })
  };

  const validateEmailHandler = () => {//email onBlur handler
    dispatchEmail({ type: "EMAIL_BLURRED" })
  };

  const validatePasswordHandler = () => {//pass onBlur handler
    dispatchPass({ type: "PASS_BLURRED" })
    //setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {//form onSubmit handler
    event.preventDefault();//callback:
    if (formIsValid) {
      ctx.loginHandler(emailState.email, passState.password)
    } else if (!emailIsValid) {
      emailInputRef.current.focus()
    } else {
      //pass is invalid:
      passwordInputRef.current.focus()
    }
    //props.onLogin(emailState.email, passState.password);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={emailIsValid}
          ref={emailInputRef}
          id="email" type="email" label="E-Mail"
          value={emailState.email}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          isValid={passIsValid}
          ref={passwordInputRef}
          id="password" type="password" label="Password"
          value={passState.password}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
