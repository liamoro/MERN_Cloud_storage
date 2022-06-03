import React from 'react'
import './navbar.less'
import Logo from '../../assets/img/navbar-logo.svg'

function Navbar() {
  return (
    <div className='navbar'>
      <img src={Logo} alt='' className='navbar__logo'/>
      <div className='navbar__header'>MERN Cloud Storage</div>
      <div className='navbar__login'>Войти</div>
      <div className='navbar__ registration'>Регистрация</div>
    </div>
  )
}

export default Navbar
