import React from 'react'
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 30px 0;
  background-color: #444;
  display: flex;
  justify-content: center;

`
const Copyright = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  color: #ccc;
`

export default function Footer() {
  return (
    <FooterContainer>
      <Copyright>&copy; 2021 Eric Snell</Copyright>
    </FooterContainer>
  )
}