import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { register } from '../helpers/api-calls';
import { getDetailsToLogin } from '../redux/slices/user-slice';
import SignupPage from './user/signup-page';

const AdminPage = () => {
  const dispatch = useDispatch();
  const navgigate = useNavigate();

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

          if (
            arrayKeys[0].username === data.username &&
            toast.warn(
              `Username ${res.data.keyValue.username} is already in use.`
            )
          )
            return;

          toast.warn(`Email ${res.data.keyValue.email} is already in use`);
          return;
        }

        if (
          res.data.message !== 'Email verification message sent successfully' &&
          toast.info(
            'Oops, something went wrong. Refresh the page and try again.'
          )
        )
          return;

        //if no error
        const userEmail = res.data.info.accepted[0];
        toast.success(
          `A verification link has been sent to ${userEmail}. Please click on the link to verify your email`
        );
        //temporary store password and email
        dispatch(getDetailsToLogin(enteredInfo));
        navgigate('/');
      });
    
  }

  return (
      <SignupPage
      adminAuth={adminAuth}
       />
  );
};
export default AdminPage;
