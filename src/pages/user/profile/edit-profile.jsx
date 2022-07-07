import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/slices/user-slice';
import { editProfile } from '../../../helpers/api-calls';
import { Link } from 'react-router-dom';
import arrowLeftSvg from '../../../assets/svg/arrowleft.svg';


const EditProfile = () => {
  const { email, username, _id } = useSelector(
    (store) => store.persistedReducer.user
  );
  const dispatch = useDispatch();

  const textInput = useRef();

  function saveData(e) {
    e.preventDefault();
    const enteredTextInput = textInput.current.value;
    const enteredInfo = {
      username: enteredTextInput,
    };

    editProfile(_id, enteredInfo)
      .then((res) => {
        dispatch(getUser(res.data));
      })
      .catch((err) => console.log(err));
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
        <input
          type='text'
          name='username'
          id='username'
          ref={textInput}
          defaultValue={username}
        />

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
