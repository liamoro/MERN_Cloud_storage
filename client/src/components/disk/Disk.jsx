import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createDir, getFiles } from '../../actions/file.js'
import FileList from './filelist/FileList'
import './disk.scss'
import Popup from './Popup.jsx'
import { setPopupDisplay } from '../../reducers/fileReducer.js'

function Disk() {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)

  function createDirHandler() {
    // dispatch(createDir(currentDir, 'testDir'))
    dispatch(setPopupDisplay('flex'))
  }

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  return (
    <div className='disk'>
      <div className='disk__btns'>
        <button className='disk__btn disk__back'>Назад</button>
        <button className='disk__btn disk__create' onClick={() => createDirHandler()}>Создать папку</button>
      </div>
      <FileList />
      <Popup/>
    </div>
  )
}

export default Disk
