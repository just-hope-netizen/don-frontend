import  Header  from './header/header';

const Layout = (props) => {
  return (
    <div className='root_only-child'>
      <Header />
      {props.children}
    </div>
  );
};
export default Layout;
