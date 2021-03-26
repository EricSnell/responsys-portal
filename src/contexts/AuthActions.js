
export async function loginUser(dispatch, loginPayload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: new URLSearchParams({
      ...loginPayload,
      'auth_type': 'password'
    })
  }

  try {
    dispatch({ type: 'REQUEST_LOGIN' })
    let response = await fetch('/login', options)
    let data = await response.json().then(data => ({ status: response.status, body: data }))
    if (data.status === 200) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.body })
      sessionStorage.setItem('currentUser', JSON.stringify(data.body))
      return data
    }
    console.log('dispatching error...');
    dispatch({ type: 'LOGIN_ERROR', error: data.body })
    return
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error })
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' })
  sessionStorage.removeItem('currentUser')
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('endpoint')
}