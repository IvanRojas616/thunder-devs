import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PublicLayout from "layouts/PublicLayout";
import HomePage from "pages/HomePage";
import AdminLayout from "layouts/AdminLayout";
import ProductsPage from "pages/admin/ProductsPage";
import { ProductToEditContext } from "context/productToEditContext";
import EditProductPage from "pages/admin/EditProductPage";
import CreateProductPage from "pages/admin/CreateProductPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import NotFoundPage from "pages/NotFoundPage";
import Users from 'pages/admin/Users';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserInfoContext } from "context/userInfoContext";
import PrivateRoute from "components/PrivateRoute";

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [productToEdit, setProductToEdit] = useState(null);
  useEffect(() => {
    console.log("producto a editar:", productToEdit);
  }, [productToEdit]);

  return (
    <Auth0Provider
      domain="dev-w8mlenzq.us.auth0.com"
      clientId="Xs8RGslfjoUAmaOnhZ9Oi9vLyMi1J9r2"
      redirectUri="http://localhost:3000/admin"
      audience="https://authtokenthunder/"
      cacheLocation="localstorage"
    >
      {
      //this context is for the information of the user, like roles etc 
      } 
      <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          </Route>
          <Route
            exact
            path={[
              "/admin",
              "/admin/profile",
              "/admin/products",
              "/admin/products/edit",
              "/admin/products/create",
              "/admin/users"
            ]}
          >
            <AdminLayout>
              <ProductToEditContext.Provider
                value={{ productToEdit, setProductToEdit }}
              >
                <Route exact path="/admin">
                  <PrivateRoute roleList={["admin","seller"]}>
                  <ProductsPage />
                  </PrivateRoute>
                </Route>
                
                <Route exact path="/admin/products">
                <PrivateRoute roleList={["admin"]}>
                  <ProductsPage />
                  </PrivateRoute> 
                </Route>
                
                
                <Route exact path="/admin/products/edit">
                <PrivateRoute roleList={["admin"]}>
                  <EditProductPage />
                  </PrivateRoute> 
                </Route>
                 
                 
                <Route exact path="/admin/products/create">
                <PrivateRoute roleList={["admin"]}>
                  <CreateProductPage />
                  </PrivateRoute> 
                </Route>
                
              </ProductToEditContext.Provider>
              
              <Route exact path="/admin/users">
              <PrivateRoute roleList={["admin"]}>
                  <Users/>
              </PrivateRoute>
              </Route>
                
            </AdminLayout>
          </Route>
          <Route exact path="*">
            <PublicLayout>
              <NotFoundPage />
            </PublicLayout>
          </Route>
        </Switch>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
      </Router>
      </UserInfoContext.Provider>
    </Auth0Provider>
  );
}

export default App;
