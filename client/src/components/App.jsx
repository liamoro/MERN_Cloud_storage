
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import './app.scss';
import Registration from "./registration/Registration";
import Login from "./registration/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../actions/user";

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  // console.log(!!localStorage.getItem('token'))
  // console.log("start App/ isAuth :: ", isAuth)

  useEffect(() => {
    console.log('useEffect start')
    dispatch(auth())
    console.log('useEffect end')
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {
            !localStorage.getItem('token') && !isAuth && 
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
