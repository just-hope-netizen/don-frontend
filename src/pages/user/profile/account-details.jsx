import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Backdrop from '../../../components/backdrop';
import { removeUser } from '../../../redux/slices/user-slice';
import { deleteUserAccount } from '../../../helpers/api-calls';
import Modal from '../../../components/modal';
import editSvg from '../../../assets/svg/edit.svg';
import arrowLeftSvg from '../../../assets/svg/arrowleft.svg';
import { toast } from 'react-toastify';


const AccountDetails = () => {
  const [openModalAndBackdrop, setOpenModalAndBackdrop] = useState(false);

  const { email, username, _id, config } = useSelector(
    (store) => store.persistedReducer.user
  );
  const dispatch = useDispatch();
  const navgigate = useNavigate();

  function modalAndBackdropHandler() {
    setOpenModalAndBackdrop(!openModalAndBackdrop);
  }

  function deleteAccount() {
    deleteUserAccount(_id, config).then((res) => {
      toast.info(res.data)
      dispatch(removeUser());
      navgigate('/');
    });
  }
  return (
    <>
      <div className='user-account-container mobile'>
        <header>
          <Link to='/' className='mobile-navigator hide'>
            <img src={arrowLeftSvg} alt=' navigate back arrow' />
          </Link>
          <h2 className='heading'>Account details</h2>

        </header>

        <span className='line-break'></span>

        <div>
          <div className='user-details-parent'>
            <div>
            <h4 className='username'>{username}</h4>
            <h4>{email}</h4>
            </div>
          <Link to='/user/details'>
            <img src={editSvg} alt='edit icon' className='edit-icon' />
          </Link>
          </div>

          <div className='delete-acc-container mobile'>
            <Link to='/user/change-password'>CHANGE PASSWORD</Link>
            <button onClick={modalAndBackdropHandler}>DELETE MY ACCOUNT</button>
          </div>
        </div>
      </div>
      {openModalAndBackdrop && <Backdrop onClick={modalAndBackdropHandler} />}
      {openModalAndBackdrop && (
        <Modal>
          <div>
            <h3>Whoa, there!</h3>
            <h4>Once you delete your account, there's no getting it back.</h4>
            <h4>Making sure you want to do this.</h4>
          </div>

          <button className='cancel-btn' onClick={modalAndBackdropHandler}>
            Cancel
          </button>
          <button className='confirm-btn' onClick={deleteAccount}>
            Confirm
          </button>
        </Modal>
      )}
    </>
  );
};

export default AccountDetails;
