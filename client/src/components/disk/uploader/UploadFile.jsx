import React from 'react'
import "./uploadFile.scss"

function UploadFile({file}) {
  console.log("UF::: ", file)

  return (
    <div className='upload-file'>
      <div className='upload-file__header'>
        <div className='upload-file__title'>{file.name}</div>
        <button className='upload-file__delete'></button>
      </div>
      <div className='upload-file__progress-bar'>
        <div className='upload-file__upload-bar' style={{width: file.progress + "%"}}/>
        <div className='upload-file__percent'>{file.progress}%</div>
      </div>
    </div>
  )
}

export default UploadFile
