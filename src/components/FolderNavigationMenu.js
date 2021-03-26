import React from 'react'
import FolderContent from './FolderContent'
import { Router } from '@reach/router'
import styled from 'styled-components'

const Container = styled.main`
  margin: 0 auto;   
  display: flex;
  max-width: 1000px;
  overflow: hidden;
  mask-image: -webkit-gradient(linear, left 95%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
`

const Column = styled.div`
  width: 50%;
`

const FolderNavigationMenu = () => {

  return (
    <Container>
      <Column>
        <FolderContent url={'/folders'} title='Folders' />
      </Column>
      <Column>
        <Router>
          <FolderContent path=':id' route='/campaigns/email/' />
        </Router>
      </Column>
    </Container>
  )
}

export default FolderNavigationMenu