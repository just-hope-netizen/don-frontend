import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Backdrop from '../../components/backdrop';

import { BackArrow, EyeIcon, EyeOffIcon } from '../../assets/svg';
import Logo from '../../components/logo';
import Modal from '../../components/modal';
import { register } from '../../helpers/api-calls';
import {
  checkPassword,
  validateEmail,
  validateUsername,
} from '../../helpers/validate';
import { getDetailsToLogin } from '../../redux/slices/user-slice';

const SignupPage = (props) => {
  const [passordError, setPassordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState(false);
  const [requestMade, setRequestMade] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //reference input value
  const textInput = useRef();
  const passwordInput = useRef();
  const emailInput = useRef();

  //validate username, password and email then pass the value to the endpoint
  function getUserInfo(e) {
    e.preventDefault();
    setRequestMade(true);
    const enteredTextInput = textInput.current.value;
    const enteredEmailInput = emailInput.current.value;
    const enteredPasswordInput = passwordInput.current.value;

    const validatedUsername = validateUsername(enteredTextInput);
    const validatedPassword = checkPassword(enteredPasswordInput);
    const validatedEmail = validateEmail(enteredEmailInput);

    if (!validatedUsername) {
      setUsernameError(true);
      setRequestMade(false);
    } else if (!validatedPassword) {
      setPassordError(true);
      setUsernameError(false);
      setRequestMade(false);
    } else if (!validatedEmail) {
      setEmailError(true);
      setUsernameError(false);
      setPassordError(false);
      setRequestMade(false);
    } else {
      const enteredInfo = {
        username: enteredTextInput,
        password: enteredPasswordInput,
        email: enteredEmailInput,
      };
      // admin or regular user
      if (props.adminAuth) {
        props.adminAuth(enteredInfo);
        setRequestMade(false);

        return;
      } else {
        auth(enteredInfo);
      }
    }
  }

  function auth(enteredInfo) {
    register(enteredInfo).then((res) => {
      // respond with the right error message
      //if  email is already in use

      if (res.status === 400) {
        const arrayKeys = [{ username: 1 }, { email: 1 }];
        const data = res.data.keyPattern;
        if (arrayKeys[0].username === data.username) {
          toast.warn(
            `Username ${res.data.keyValue.username} is already in use.`
          );
          setRequestMade(false);
        } else {
          toast.warn(`Email ${res.data.keyValue.email} is already in use`);
          setRequestMade(false);
        }
      } else if (res.data.message === 'Email verification failed to send') {
        toast.info(
          'Oops, something went wrong. Refresh the page and try again.'
        );
        setRequestMade(false);
      } else if (res.data.message === 'Email is already in use') {
        setRequestMade(false);

        toast.info('Email has been used to register an account.');
      } else {
        //if no error
        const userEmail = res.data.info.accepted[0];
        setVerificationEmail(userEmail);
        dispatch(getDetailsToLogin(enteredInfo));
        setRequestMade(false);
      }
    });
  }

  return (
    <div className='sign-up-container'>
      <header>
        <Link to='/' className='mobile-navigator hide'>
          <BackArrow />
        </Link>
        <h2 className='heading'>Sign Up</h2>
      </header>

      <form className='sign-up-form'>
        <label htmlFor='username' className='form-label'>
          Username
        </label>
        <div className={`input-wrapper ${usernameError && 'error'}`}>
          <input type='text' name='username' id='username' ref={textInput} />
        </div>
        <span className='error-msg'>
          {usernameError &&
            'You have entered an invalid username, username must be more than 3 characters!'}
        </span>

        <label htmlFor='password' className='form-label'>
          Password
        </label>

        <div className={`input-wrapper ${passordError && 'error'}`}>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            id='password'
            ref={passwordInput}
          />

          <button
            type='button'
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>

        <span className='error-msg'>
          {passordError &&
            '7 to 15 characters with one numeric value and special character e.g.qwerty123$.'}
        </span>

        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <div className={`input-wrapper ${emailError && 'error'}`}>
          <input type='email' name='email' id='email' ref={emailInput} />
        </div>
        <span className='error-msg'>
          {emailError &&
            'You have entered an invalid email, check and try again!'}
        </span>
        <button className='form-btn' onClick={getUserInfo}>
          Sign Up{' '}
        </button>
      </form>
      <h4 className='form-navigator-container'>
        Already have an Account ?{' '}
        <Link to={'/login'} className='form-navigator'>
          Sign In
        </Link>{' '}
      </h4>

      <h4 className='form-navigator-container'>
        By signing up an account you accept our
        <Link to={'/development'} className='form-navigator'>
          Terms of Use
        </Link>{' '}
        and
        <Link to={'/development'} className='form-navigator'>
          Privacy Policy
        </Link>{' '}
      </h4>
      {verificationEmail && (
        <Modal>
          <Logo />
          <article className='verify-msg-container'>
            <h3>Please check your email.</h3>
            <h4>
              We have sent you a link in your email to verify your account.
            </h4>
          </article>
        </Modal>
      )}
      {verificationEmail && (
        <Backdrop
          onClick={() => {
            navigate('/');
          }}
        />
      )}
      {requestMade && <Backdrop > 
        <div className='loader loader-backdrop' />
        </Backdrop>}
    </div>
  );
};
export default SignupPage;
