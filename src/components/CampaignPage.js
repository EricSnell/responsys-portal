import React from 'react'
import Loader from './Loader'
import { useFetch } from '../hooks/useFetch'
import DataTable from './DataTable'
import VariableTable from './VariableTable'
import CampaignDetailsCard from './CampaignDetailsCard'
import styled from 'styled-components'

const CampaignContainer = styled.section` 
  margin: 0 auto;
  font-size: 1.5rem;
  padding: 0 20px;
`

const CampaignHeader = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 5rem;
`

const CampaignSL = styled.h2`
  font-size: 1.9rem;
  font-weight: bold;
  margin-bottom: 5rem;
  font-style: italic;
`

const CampaignPage = ({ id }) => {
  const url = `/campaigns/email/${id}`
  const { loadState, dataState, errorState } = useFetch(url)
  const { isLoading } = loadState
  const { data: campaign } = dataState
  const { error } = errorState
  const campaignListName = campaign && getTableData(campaign, 'PROFILE_LIST')[0].alias
  const campaignListData = campaign && getTableData(campaign, 'PROFILE_LIST')
  const campaignPets = campaign && getTableData(campaign, 'PET')
  const campaignDynamicVariables = campaign && getTableData(campaign, 'DYNAMIC_VARIABLE')

  function getTableData(data, type) { return data.dataSource.filter(table => table.type === type) }

  return (
    isLoading ? (
      <Loader />
    ) :
      campaign ? (
        <CampaignContainer>
          <CampaignHeader>{campaign.name}</CampaignHeader>
          <CampaignSL>{campaign.subject}</CampaignSL>
          <CampaignDetailsCard campaign={campaign} />
          <div>
            <DataTable isList={true} listName={campaignListName} dataSources={campaignListData} />
            <DataTable listName={campaignListName} dataSources={campaignPets} />
            <VariableTable dataSources={campaignDynamicVariables} />
          </div>
        </CampaignContainer>
      ) : (
          <h2>{error}</h2>
        )
  )
}

export default CampaignPage