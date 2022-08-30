const SHOW_UPLOADER = 'SHOW_UPLOADER' 
const HIDE_UPLOADER = 'HIDE_UPLOADER' 
const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE' 
const REMOVE_UPLOAD_FILE = 'REMOVE_UPLOAD_FILE' 
const CHANGE_UPLOAD_FILE = 'CHANGE_UPLOAD_FILE' 

console.log("LS from reducers:: ", localStorage.getItem('token'))

// isAuth : false
// как правильно настроить дефолт диспатча

const defaultState = {
  isVisible: false,
  files: []
}

export default function userReducer(state = defaultState, action) {
  console.log('action:::: ', action)
  console.log('state::::: ', state)
  switch (action.type) {
    case SHOW_UPLOADER: return {...state, isVisible: true}
    case HIDE_UPLOADER: return {...state, isVisible: false}
    case ADD_UPLOAD_FILE: return {...state, files: [...state.files, action.payload]}
    case REMOVE_UPLOAD_FILE: return [...state.files.filter(file => file.id != action.payload)]
    default:
      return state
  }
}


export const showUploader = () => ({type: SHOW_UPLOADER})
export const hideUploader = () => ({type: HIDE_UPLOADER})
export const addUploadFile = (file) => ({type: ADD_UPLOAD_FILE, payload: file})
export const removeUploadFile = (fileId) => ({type: REMOVE_UPLOAD_FILE, payload: fileId})