import React from 'react'
import {useSelector} from "react-redux";
import './filelist.scss'
import File from './file/File'

function FileList() {
  useSelector(state => console.log(state))
  // console.log("FileList state:: ", useSelector(state => state.files.files))

  const files = useSelector(state => state.files.files)?.map(file => {
    return <File key={file.id} file={file}/>
  })

  // const files = [{_id:1, name: 'direc', type: 'jpg', size: '5gb', date: '20.02.2020'}, {_id:2, name: 'direc2', type: 'dir', size: '5gb', date: '20.12.2020'}].map( file => <File key={file._id} file={file}/> )

  return (
    <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Название</div>
                <div className="filelist__date">Дата</div>
                <div className="filelist__size">Размер</div>
            </div>
            {files}
        </div>
  )
}

export default FileList
