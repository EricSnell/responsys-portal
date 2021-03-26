import React from 'react'
import { Link, navigate } from '@reach/router'
import { useAuthDispatch, logout } from '../contexts/index'
import styled from 'styled-components';

const NavContainer = styled.nav`
  padding: 20px 15px;
  max-width: 1500px;
  margin: 0 auto 50px;
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid #eee;
`

const NavHome = styled(Link)`
  & > img {
    width: 30px;
  }
`

const LogoutButton = styled.button`
  background: #333;
  color: #fff;
  padding: 0 15px;
  font-size: 18px;
  border: 2px solid #333;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background: #fff;
    color: #333;
  }
`

export default function Nav() {
  const dispatch = useAuthDispatch()

  const handleLogout = () => {
    logout(dispatch)
    navigate('/')
  }

  return (
    <NavContainer>
      <NavHome to="folders"><img src="https://image.flaticon.com/icons/png/512/25/25694.png" alt="Home" /></NavHome>
      <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
    </NavContainer>
  )
}