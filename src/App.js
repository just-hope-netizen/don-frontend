import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartSection from './components/cart-section';
import Layout from './components/layout/layout';
import AdminPage from './pages/admin-page';
import AddProduct from './pages/admin/add-product';
import EditProduct from './pages/admin/edit-product';
import OrderedProducts from './pages/admin/ordered-products';
import Checkout from './pages/checkout-page';
import OrderConfirmation from './pages/checkout/payment-method/order-confirmation';
import Paypal from './pages/checkout/payment-method/paypal';
import HomePage from './pages/home-page';
import Category1 from './pages/home/categories/category1';
import Category2 from './pages/home/categories/category2';
import Category3 from './pages/home/categories/category3';
import Category4 from './pages/home/categories/category4';
import SettingsPage from './pages/settings-page';
import UserPage from './pages/user-page';
import AccountDetails from './pages/user/profile/account-details';
import ChangePassword from './pages/user/profile/change-password';
import EditProfile from './pages/user/profile/edit-profile';
import UnderConstruction from './pages/underconstruction-page';
import Orders from './pages/user/profile/orders';
import SigninPage from './pages/user/signin-page';
import SignupPage from './pages/user/signup-page';
import VerificationPage from './pages/verification-page';


function App() {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage className='main' />}>
          <Route path='/' element={<Category1 />} /> 
          <Route path='category2' element={<Category2 />} />
          <Route path='category3' element={<Category3 />} />
          <Route path='category4' element={<Category4 />} />
        </Route>
         
        <Route path='user' element={<UserPage />} >
          <Route path='account-details' element={<AccountDetails/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='details' element={<EditProfile/>}/>
          <Route path='change-password' element={<ChangePassword/>}/>
        </Route>
         <Route path='development' element={<UnderConstruction/>}/>
        <Route path='register' element={<SignupPage/>}/>
        <Route path='login' element={<SigninPage/>}/>

        <Route path='cart' element={<CartSection />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='paypalwindow' element={<Paypal />} />
        <Route path='order-confirmation' element={<OrderConfirmation />} />   
        <Route path='verify/:userId/:uniqueString' element={<VerificationPage/>}/>

        {/*  protected routes */}
        <Route path='settings/admin' element={<SettingsPage />}>
          <Route path='account-details' element={<AccountDetails />} />
          <Route path='development' element={<UnderConstruction />} />
          <Route path='orders' element={<OrderedProducts />} />
          <Route path='details' element={<EditProfile />} />
          <Route path='change-password' element={<ChangePassword />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='edit-product' element={<EditProduct />} />
        </Route>
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
      <ToastContainer />
    </Layout>
  );
}

export default App;
