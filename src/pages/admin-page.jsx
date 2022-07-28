import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Backdrop from '../components/backdrop';
import Logo from '../components/logo';
import Modal from '../components/modal';

import { register } from '../helpers/api-calls';
import { getDetailsToLogin } from '../redux/slices/user-slice';
import SignupPage from './user/signup-page';

const AdminPage = () => {
  const [verificationEmail, setVerificationEmail] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // register and login admin
  function adminAuth(enteredInfo) {
    //append admin
    const data = enteredInfo;
    data.isAdmin = true;
    register(data).then((res) => {
      // respond with the right error message
      //if username or email is already taking

      if (res.status === 400) {
        const arrayKeys = [{ username: 1 }, { email: 1 }];
        const data = res.data.keyPattern;

        if (arrayKeys[0].username === data.username) {
          toast.warn(
            `Username ${res.data.keyValue.username} is already in use.`
          );
        } else {
          toast.warn(`Email ${res.data.keyValue.email} is already in use`);
        }
      } else if (res.data.message === 'Email verification failed to send') {
        toast.info(
          'Oops, something went wrong. Refresh the page and try again.'
        );
        return;
      } else if (res.data.message === 'Email is already in use') {
        toast.info('Email has been used to register an account.');
        return;
      } else {
        //if no error
        const userEmail = res.data.info.accepted[0];
        setVerificationEmail(userEmail);
        dispatch(getDetailsToLogin(enteredInfo));
      }
    });
  }

  return (
    <>
      <></>
      <SignupPage adminAuth={adminAuth} />
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
    </>
  );
};
export default AdminPage;
