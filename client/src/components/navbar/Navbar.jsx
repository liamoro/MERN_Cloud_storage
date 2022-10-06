import React, { useState } from 'react'
import './navbar.scss'
import Logo from '../../assets/img/navbar-logo1.png'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'
import { getFiles, searchFiles } from '../../actions/file'
// import { setCurrentDir, setFiles } from '../../reducers/fileReducer'
import { showLoader } from '../../reducers/appReduser'


function Navbar() {
const isAuth = useSelector(state => state.user.isAuth)
const dispatch = useDispatch()
const [searchName, setSearchName] = useState('')
const [searchTimeout, setSearchTimeout] = useState(false)
const currentDir = useSelector(state => state.files.currentDir)


function searchChangeHandler(e) {
  setSearchName(e.target.value)
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  dispatch(showLoader())
  if (e.target.value != '') {
    setSearchTimeout(setTimeout((value) => {
      dispatch(searchFiles(value))
    }, 500, e.target.value))
  } else {
    dispatch(getFiles(currentDir))
  }


}

return (
    <div className='navbar'>
      <div className='container'>
        <img src={Logo} alt='' className='navbar__logo'/>
        <div className='navbar__header'>MERN Cloud Storage</div>
        { isAuth && <input 
          value={searchName}

          onChange={e => searchChangeHandler(e)}
          className="navbar__search" 
          type='text' 
          placeholder='поиск...'
          />}
        { !isAuth && <div className='navbar__login'><NavLink to={'/login'}>Войти</NavLink></div>}
        { !isAuth && <div className='navbar__registration'><NavLink to={'/registration'}>Регистрация</NavLink></div>}
        { isAuth && <div className='navbar__login' onClick={() => dispatch(logout())}>Выйти</div>}

      </div>
        
    </div>
  )
}

export default Navbar
