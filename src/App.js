import React from 'react';
import { Route, Switch } from 'react-router-dom'
import About from './Container/About/About';
import Blog from './Container/Blog/Blog';
import Contact from './Container/Contact/Contact';
import Features from './Container/Features/Features';
import Footer from './Container/Footer/Footer';
import Header from './Container/Header/Header';
import Home from './Container/Home/Home';
import Shop from './Container/Shop/Shop';
import Shopdetail from './Container/Shop/Shopdetail';
import Cart from './Container/Cart/Cart';
import Login from './Container/Login/Login';
import Public from './Root/Public';
import Private from './Root/Private';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from "notistack";
import { persistor, store } from './redux/Store';
import { Provider } from 'react-redux';
import Layout from './Admin/Component/Layout';
import Category from './Admin/Container/Category';
import Product from './Admin/Container/Product';


function App(props) {
  return (
    <>
    <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      <Header />

      <Switch>
        <Public path={"/"} exact component={Home} />
        <Public path={"/shop"} exact component={Shop} />
        <Public path={"/shopdetail"} exact component={Shopdetail} />
        <Private path={"/features"} exact component={Features} />
        <Public path={"/blog"} exact component={Blog} />
        <Public path={"/about"} exact component={About} />
        <Public path={"/contact"} exact component={Contact} />
        <Private path={"/cart"} exact component={Cart } />
        <Public path={"/login"} restricted = {true} exact component={Login} />
        <Layout >
        <Route path={"/category"} exact component={Category}/>
        <Route path={"/product"} exact component={Product}/>
        
       </Layout>
      </Switch>
      <Footer />  
      </PersistGate>
        </Provider>
      </SnackbarProvider>
    </>
  );
}

export default App;