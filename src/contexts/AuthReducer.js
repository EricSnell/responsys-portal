
let user = sessionStorage.getItem('currentUser')
  ? JSON.parse(sessionStorage.getItem('currentUser')).user
  : ''
let token = sessionStorage.getItem('currentUser')
  ? JSON.parse(sessionStorage.getItem('currentUser')).authToken
  : ''
let endpoint = sessionStorage.getItem('currentUser')
  ? JSON.parse(sessionStorage.getItem('currentUser')).endPoint
  : ''


export const initialState = {
  user: '' || user,
  token: '' || token,
  endpoint: '' || endpoint,
  loading: false,
  errorMessage: null
}

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true
      }
    case 'LOGIN_SUCCESS':
      console.log('SUCCESS PAYLOAD:', action.payload)
      return {
        ...initialState,
        loading: false,
        user: action.payload.user,
        token: action.payload.authToken,
        endpoint: action.payload.endPoint,
        errorMessage: null
      }
    case 'LOGOUT':
      console.log('REDUCER LOGOUT')
      return {
        ...initialState,
        user: '',
        token: '',
        endpoint: ''
      }
    case 'LOGIN_ERROR':
      console.log({
        ...initialState,
        loading: false,
        errorMessage: action.error.data
      })
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}