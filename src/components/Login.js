import React, { useState } from 'react'
import { loginUser, useAuthState, useAuthDispatch } from '../contexts/index'
import styled from 'styled-components'

const LoginContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 30px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .3);
  border-radius: 4px;
  transform: translateY(30%);
`

const LoginForm = styled.form`
`

const LoginFormHeader = styled.h2`
  font-size: 2rem;
  color: #103742;
  font-weight: 800;
  margin-bottom: 1.3rem;
`

const LoginLabel = styled.label`
  color: #666260;
  font-size: 1.3rem;
  display: block;
  margin-bottom: 1.4rem;
  & input {
    font-size: 1.6rem;
    background: #f2f2f2;
    border-radius: 4px;
    width: 100%;
    padding: 20px;
  }
`

const LoginButton = styled.button`
  padding: 12px 24px;
  margin-bottom: 15px;
  font-size: 1.3rem;
  color: #fff;
  border-radius: 4px;
  background: #e5122e;
  &:hover {
    cursor: pointer;
    background-color: #F03A52;
  }
`

const ErrorMessage = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAuthDispatch()
  const { errorMessage } = useAuthState()

  const handleLogin = async e => {
    e.preventDefault();
    const credentials = {
      'user_name': username,
      'password': password
    }

    try {
      let response = await loginUser(dispatch, credentials)
      if (!response) return
    } catch (error) {
      console.log('LOGIN ERROR:', error)
    }
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <LoginFormHeader>Sign in</LoginFormHeader>
        <LoginLabel htmlFor="username">Username:
        <input
            type="text"
            id="username"
            name="user_name"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </LoginLabel>
        <LoginLabel htmlFor="password">Password:
        <input type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </LoginLabel>
        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
      {
        errorMessage ? (
          <ErrorMessage>{errorMessage.data}</ErrorMessage>
        ) : null
      }
    </LoginContainer>
  )
}

export default Login