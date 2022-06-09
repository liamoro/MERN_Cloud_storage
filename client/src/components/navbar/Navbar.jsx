import React from 'react'
import './navbar.scss'
import Logo from '../../assets/img/navbar-logo1.png'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Navbar() {
const isAuth = useSelector(state => state.user.isAuth)

return (
    <div className='navbar'>
      <div className='container'>
        <img src={Logo} alt='' className='navbar__logo'/>
        <div className='navbar__header'>MERN Cloud Storage</div>
        { !isAuth && <div className='navbar__login'><NavLink to={'/login'}>Войти</NavLink></div>}
        { !isAuth && <div className='navbar__registration'><NavLink to={'/registration'}>Регистрация</NavLink></div>}
        { isAuth && <div className='navbar__login'>Выйти</div>}

      </div>
        
    </div>
  )
}

export default Navbar
