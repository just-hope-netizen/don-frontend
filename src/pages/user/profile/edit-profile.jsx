import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../redux/slices/user-slice';
import { editProfile } from '../../../helpers/api-calls';
import { Link } from 'react-router-dom';
import arrowLeftSvg from '../../../assets/svg/arrowleft.svg';
import { toast } from 'react-toastify';
import { validateUsername } from '../../../helpers/validate';

const EditProfile = () => {
  const [usernameError, setUsernameError] = useState(false);

  const { email, username, _id, config } = useSelector(
    (store) => store.persistedReducer.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const textInput = useRef();

  function saveData(e) {
    e.preventDefault();
    const enteredTextInput = textInput.current.value;
    const validatedUsername = validateUsername(enteredTextInput);
    if (!validatedUsername) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
      const enteredInfo = {
        username: enteredTextInput,
      };

      editProfile(_id, enteredInfo, config).then((res) => {
        if (res.status === 200) {
          dispatch(getUser(res.data));
          toast.success('Username changed!');
          navigate('/user/account-details');
        } else {
          toast.info('Something went wrong, we are on it.');
        }
      });
    }
  }

  return (
    <section className='edit-details-container'>
      <header>
        <Link to='/' className='mobile-navigator hide'>
          <img src={arrowLeftSvg} alt=' navigate back arrow' />
        </Link>
        <h2 className='heading'>Details</h2>
      </header>
      <span className='line-break'></span>
      <form className='edit-details-form'>
        <label htmlFor='username' className='form-label'>
          Username
        </label>
        <div className={`input-wrapper ${usernameError && 'error'}`}>
          <input
            type='text'
            name='username'
            id='username'
            ref={textInput}
            defaultValue={username}
          />
        </div>
        <span className='error-msg'>
          {usernameError &&
            'You have entered an invalid username, username must be more than 3 characters!'}
        </span>
        <div>
          <h4>Email</h4>
          <span>{email}</span>
        </div>
        <button className='form-btn btn' onClick={saveData}>
          SAVE
        </button>
      </form>
    </section>
  );
};

export default EditProfile;
