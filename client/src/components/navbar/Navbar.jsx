import React, { useState } from 'react'
import './navbar.scss'
import Logo from '../../assets/img/navbar-logo1.png'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'


function Navbar() {
const isAuth = useSelector(state => state.user.isAuth)
const dispatch = useDispatch()
const [searchName, setSearchName] = useState('')

return (
    <div className='navbar'>
      <div className='container'>
        <img src={Logo} alt='' className='navbar__logo'/>
        <div className='navbar__header'>MERN Cloud Storage</div>
        { isAuth && <input className="navbar__search" type='text' placeholder='поиск...'/>}
        { !isAuth && <div className='navbar__login'><NavLink to={'/login'}>Войти</NavLink></div>}
        { !isAuth && <div className='navbar__registration'><NavLink to={'/registration'}>Регистрация</NavLink></div>}
        { isAuth && <div className='navbar__login' onClick={() => dispatch(logout())}>Выйти</div>}

      </div>
        
    </div>
  )
}

export default Navbar
