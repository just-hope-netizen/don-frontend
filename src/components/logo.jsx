import don from '../assets/img/don-remolo.png';

const Logo = (props) => {
  return (
    <div className={props.className ? props.className :'logo-container'}>
      <img
        src={don}
        alt='don remolo character holding a pizza. This is the official logo'
        className='menu-logo'
      />
      <h4 className='menu-text'>
        <span className='text-pizzeria'>Pizzeria</span>
        <span>DON REMOLO</span>
      </h4>
    </div>
  );
};

export default Logo;
