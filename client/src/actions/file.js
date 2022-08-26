import axios from 'axios'
import {addFile, deleteFileAction, setFiles} from "../reducers/fileReducer";
import { auth } from './user';

export function  getFiles(dirId) {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:5000/api/files${ dirId ? '?parent='+dirId : '' }`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      dispatch(setFiles(response.data))
      // console.log("file.js ", response.data)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}



export function  createDir(dirId, name) {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:5000/api/files`, {
        name,
        parent: dirId,
        type: 'dir'

      }, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      dispatch(addFile(response.data))
      console.log("file.js dir was created ", response.data)
    } catch (e) {
      if (e.response.status === 401 && e.response.statusText === "Unauthorized") {
        console.log("User is unauthorized!")
        dispatch(auth())
      }
      alert(e.response.data.message)
    }
  }
}

export function  uploadFile(file, dirId) {
  return async dispatch => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (dirId) {
        formData.append('parent', dirId)
      }

      const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        onUploadProgress: progressEvent => {
          const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
          console.log('total', totalLength)
          if (totalLength) {
              let progress = Math.round((progressEvent.loaded * 100) / totalLength)
              console.log(progress)
          }
        }
      })
      dispatch(addFile(response.data))
      // console.log("file.js dir was created ", response.data)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

export async function downloadFile(file) {
  try {
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.status === 200) {

      // для скачивания создаем невидимую ссылку, имитируем клик по ней и удаляем

      const blob = await response.blob() // подобный физическому файлу объект
      const downloadUrl = window.URL.createObjectURL(blob)  // создаем ссылку для скачанивания в формате blob
      const link = document.createElement('a')
      link.href = downloadUrl 
      link.download = file.name // имя для скачиваемого файла
      document.body.appendChild(link)
      link.click() // имитируем клик
      link.remove() // удаляем элемент из дом
      
    }
  } catch (e) {
    console.log(e)
  }
}

export function deleteFile(file) {
  console.log('DF File: ', file)
  return async dispatch => {
    try {
      console.log("start d")
      const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(deleteFileAction(file._id))
      alert(response.data.message)

    } catch (e) {
      console.log(e?.response?.data?.message)
    }
  }
}