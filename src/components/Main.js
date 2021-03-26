import React from 'react';
import Nav from './Nav'
import Footer from './Footer'
import Login from './Login'
import { useAuthState } from '../contexts/index'
import styled from 'styled-components'

const Wrapper = styled.main`
  min-height: 1000px;
  height: auto;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 140px;
`

const Main = ({ children }) => {
  const auth = useAuthState()

  return (
    auth.token ? (
      <>
        <Nav />
        <Wrapper>
          {children}
        </Wrapper>
        <Footer />
      </>
    ) : (
        <Login />
      )
  )
}

export default Main;
