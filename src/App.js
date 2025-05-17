import logo from './logo.svg';
import './App.css';
import {Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom';
import SignIn from './Components/SignIn';
import AddProduct from './Pages/AddProduct';
import ViewProductsAdmin from './Pages/ViewProductsAdmin';
import ProductDetails from './Pages/ProductDetails';
import Homepage from './Pages/HomePage';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import SignUp from './Components/Signup';
import OtherPage from './Pages/OtherPage'
import OrderSuccess from './Pages/OrderSuccess';
import AdminMyOrder from './Pages/AdminMyOrder';
import AdminApproveOrder from './Pages/AdminApproveOrder';
import OrderTracking from './Pages/OrderTracking';
import UserMyOrder from './Pages/UserMyOrder';
import UserDashboard from './Pages/UserDashboard';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import OrdersforTracking from './Pages/OrdersforTracking';
import AdminDashboard from './Pages/AdminDashboard';
import ProductDetailsAdmin from './Pages/ProductDetailsAdmin';
import GuestPrivacyPolicy from './Pages/GuestPrivacyPolicy';
import ProductsPage from './Pages/ProductsPage';
// import CartSideBar from './Components/CartSideBar';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        {/* <Route path='/auth' element={<HomepageAuth/>}/> */}
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/myproducts' element={<ViewProductsAdmin/>}/>
        <Route path='/details' element={<ProductDetails/>}/>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/others' element={<OtherPage/>}/>
        <Route path='/success' element={<OrderSuccess/>}/>
        <Route path='/adminOrder' element={<AdminMyOrder/>}/>
        <Route path='/viewAll' element={<AdminApproveOrder/>}/>
        <Route path='/track' element={<OrderTracking/>}/>
        <Route path='/UserMyOrder' element={<UserMyOrder/>}/>
        <Route path='/userdash' element={<UserDashboard/>}/>
        <Route path='/privacy' element={<PrivacyPolicy/>}/>
        <Route path='/ordersforTrack' element={<OrdersforTracking/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/prodDetails' element={<ProductDetailsAdmin/>}/>
        <Route path='/guestPrivacy' element={<GuestPrivacyPolicy/>}/>
        {/* <Route path='/sideCart' element={<CartSideBar/>}/> */}
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
