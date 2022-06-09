
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import './app.scss';
import Registration from "./registration/Registration";
import Login from "./registration/Login";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {!isAuth && 
            <Routes>
              <Route path='/registration' element={<Registration />}/>
              <Route path='/login' element={<Login />}/>
            </Routes>
          }
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
