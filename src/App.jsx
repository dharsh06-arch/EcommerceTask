import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Signin from "./auth/client/Signin";
import Signup from "./auth/client/Signup";
import ForgotPassword from "./auth/client/ForgotPassword";
import ResetPassword from "./auth/client/ResetPasswor";
import Home from "./Pages/client/Home/Home";
import Mainlayout from "./layout/MainLayout/Mainlayout";
import Adminlayout from "./layout/AdminLayout/Adminlayout";
import ProtectedRoute from "./components/ProtectedRoutes/Protectedroute";
import DashBoard from "./Pages/admin/DashBoard/DashBoard";
import Products from "./Pages/admin/Products/Products";
import Users from "./Pages/admin/Users/Users";
import ProductList from "./Pages/client/ProductList.jsx";
import ProductDetail from "./Pages/client/ProductDetail/index.jsx";
import Cart from "./Pages/client/Cart/index.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* <Route element={<ProtectedRoute  />} > */}
          <Route element={<Mainlayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          {/* </Route> */}
          <Route path="/admin/*" element={<Adminlayout />}>
            <Route index element={<DashBoard />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
