import { Link } from 'react-router-dom';
import underConstruImg from '../assets/img/under.png';
import arrowLeftSvg from '../assets/svg/arrowleft.svg';

const UnderConstruction = () => {
  return (
    <>
      <div className='under-constru-container mobile'>
        <header>
          <Link to='/' className='mobile-navigator hide'>
            <img src={arrowLeftSvg} alt=' navigate to homepage' />
          </Link>
        </header>
        <div className='under-constru-wrapper'>
          <img
            src={underConstruImg}
            alt='website under construction'
            className='res-img'
          />
        </div>
      </div>
    </>
  );
};

export default UnderConstruction;
