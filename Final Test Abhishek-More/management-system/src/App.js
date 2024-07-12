import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Layout from "./layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import AuthGuard from './auth/AuthGuard';
import AddProperty from './pages/AddProperty';
import Properties from './pages/Properties';
import Home from './pages/Home';
import LoginAuthGuard from './auth/LoginAuthGuard';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/login' element={<LoginAuthGuard component={Login} />} />
          <Route exact path='/properties' element={<AuthGuard component={Properties}/>} />
          <Route exact path='/properties/add' element={<AuthGuard component={AddProperty}/>} />
          <Route exact path='/properties/edit/:id' element={<AuthGuard component={AddProperty}/>} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </Layout>
    </div>
    </BrowserRouter>
  );
}

export default App;
