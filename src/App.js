import React from 'react';
import Main from './components/Main'
import FolderNavigationMenu from './components/FolderNavigationMenu'
import CampaignList from './components/CampaignList'
import CampaignPage from './components/CampaignPage'
import PushItem from './components/PushItem'
import SMSItem from './components/SMSItem'
import ProgramList from './components/ProgramList'
import ProgramItem from './components/ProgramItem'
import LinkTableItem from './components/LinkTableItem'
import PetItem from './components/PetItem'
import { GlobalStyles } from './components/styled/GlobalStyles'
import { Router } from '@reach/router'
import { AuthProvider } from './contexts/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <GlobalStyles />
      <Router>
        <Main path='/'>
          <FolderNavigationMenu path='folders/*' />
          <CampaignList path='campaigns' />
          <CampaignPage path='campaigns/email/:id' />
          <PushItem path='campaigns/push/:id' />
          <SMSItem path='campaigns/sms/:id' />
          <ProgramList path='programs' />
          <ProgramItem path='programs/:id' />
          <LinkTableItem path='linktables/:folder/:id' />
          <PetItem path=':list/pets/:id' />
        </Main>
      </Router>
    </AuthProvider>
  )
}

export default App;
