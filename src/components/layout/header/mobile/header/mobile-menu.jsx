import Backdrop from '../../../../backdrop';
import Logo from '../../../../logo';
import Nav from '../../pc/nav';

const MobileMenu = (props) => {
  
  return (
  <>
      <div className={props.className}>
        <Logo />
        <Nav className='mobile-nav'/>
        <Backdrop onClick={props.onClick} className={props.menu ? 'mobile-backdrop slide': 'mobile-backdrop' }/>
      </div>
    </>
  );
};
export default MobileMenu;
