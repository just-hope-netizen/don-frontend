import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { login, verifyUser } from '../helpers/api-calls';
import { getUser, removeDetailsAfterLogin } from '../redux/slices/user-slice';
import { toast } from 'react-toastify';
import Backdrop from '../components/backdrop';
import Modal from '../components/modal';

const VerificationPage = () => {
  const { email, password } = useSelector(
    (store) => store.persistedReducer.user
  );
  const dispatch = useDispatch();
  const navgigate = useNavigate();

  const { userId, uniqueString } = useParams();

  return (
    <div>
      <Backdrop />
      <Modal>

      <span className='icon complete confirmation'></span>
      <h3>Email confirmed.</h3>
      <button
        className='form-btn'
        onClick={() => {
          verifyUser(userId, uniqueString).then((res) => {
            if (res.data.verified) {
              login(email, password).then((res) => {
                dispatch(removeDetailsAfterLogin());
                toast.success(`welcome ${res.data.username}`);
                navgigate('/');
                //time out set, because of the temporary email and password store
                setTimeout(() => {
                  dispatch(getUser(res.data));
                }, 2000);
              });
            }else{
              toast.info('Something went wrong, we are on it.')
            }
          });
        }}
      >
        Activate account
      </button>
                </Modal>
    </div>
  );
};

export default VerificationPage;
