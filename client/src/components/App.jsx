
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import './app.scss';
import Registration from "./registration/Registration";
import Login from "./registration/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "../actions/user";
import Disk from "./disk/Disk";

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
            !isAuth ?  
            <Routes>
              <Route path='/registration' element={<Registration />}/>
              <Route path='/login' element={<Login />}/>
              <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes> 
            :
            <Routes>
              <Route path='/' element={<Disk />}/>
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          }
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
