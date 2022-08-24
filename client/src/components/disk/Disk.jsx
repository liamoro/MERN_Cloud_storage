import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { createDir, getFiles } from '../../actions/file.js'
import FileList from './filelist/FileList'
import './disk.scss'
import Popup from './Popup.jsx'
import { popToStack, setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer.js'

function Disk() {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)
  // console.log("currentDir:: ", currentDir)
  // console.log("dirStack:: ", dirStack)


  function showPopupHandler() {
      dispatch(setPopupDisplay('flex'))
  }

  function backClickHandler() {
    const backDirId = dirStack[dirStack.length - 1]
    dispatch(popToStack(dirStack.length - 1))
    dispatch(setCurrentDir(backDirId))
  }

  useEffect(() => {
    // console.log('currentDir::: ', currentDir)
    dispatch(getFiles(currentDir))
    // console.log('currentDir::: ', currentDir)
  }, [currentDir])

  return (
    <div className='disk'>
      <div className='disk__btns'>
        {currentDir && <button className='disk__btn disk__back' onClick={() => backClickHandler()}>Назад</button>}
        <button className='disk__btn disk__create' onClick={() => showPopupHandler()}>Создать папку</button>
      </div>
      <FileList />
      <Popup/>
    </div>
  )
}

export default Disk
