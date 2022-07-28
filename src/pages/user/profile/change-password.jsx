import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkPassword } from '../../../helpers/validate';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { BackArrow, EyeIcon, EyeOffIcon } from '../../../assets/svg';
import { editProfile } from '../../../helpers/api-calls';
import { getUser } from '../../../redux/slices/user-slice';

const ChangePassword = () => {
  const [passordError, setPassordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPassordMatch] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { _id, config } = useSelector((store) => store.persistedReducer.user);

  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  //validate password, if validated change old to current
  function getData(e) {
    e.preventDefault();
    const enteredPasswordInput = passwordInput.current.value;
    const enteredComfirmPasswordInput = confirmPasswordInput.current.value;
    const validatedPassword = checkPassword(enteredPasswordInput);

    if (!validatedPassword) {
      setPassordError(true);
    } else if (enteredPasswordInput !== enteredComfirmPasswordInput) {
      setPassordMatch(false);
      setPassordError(false);
    } else {
      setPassordMatch(true)
      const enteredInfo = {
        password: enteredComfirmPasswordInput,
      };
      
      editProfile(_id, enteredInfo, config).then((res) => {
        if (res.status === 200) {
          dispatch(getUser(res.data));
          toast.success('password change');
          navigate('/user/account-details');
        } else {
          toast.info('Something went wrong, we are on it.');
        }
      });
    }
  }

  return (
    <div className='change-password-container'>
      <header>
        <Link to='/' className='mobile-navigator hide'>
          <BackArrow />
        </Link>
        <h2 className='heading'>Change Password</h2>
      </header>
      <span className='line-break'></span>

      <form className='change-password-form '>
        <label htmlFor='password' className='form-label'>
          New Password
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
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}{' '}
          </button>
        </div>
        <span className='error-msg'>
          {(passordError &&
            '7 to 15 characters with one numeric value and special character e.g.qwerty123$.') ||
            (passwordMatch ? null : 'Password does not match')}
        </span>

        <label htmlFor='password' className='form-label'>
          {' '}
          Confirm Password
        </label>

        <div className={`input-wrapper ${passwordMatch ? null : 'error'}`}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name='confirm-password'
            id='confirm-password'
            ref={confirmPasswordInput}
          />

          <button
            type='button'
            onClick={() => {
              setShowConfirmPassword(!showConfirmPassword);
            }}
          >
            {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}{' '}
          </button>
        </div>
        <span className='error-msg'>
          {passwordMatch ? null : 'Password does not match'}
        </span>
        <button onClick={getData} className='form-btn btn' type='button'>
          SUBMIT
        </button>
      </form>
    </div>
  );
};
export default ChangePassword;
