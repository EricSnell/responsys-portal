import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import Loader from './Loader'
import CampaignTypeSelect from './CampaignTypeSelect'
import CampaignListItem from './CampaignListItem'

const CampaignList = () => {
  const [campaignType, setCampaignType] = useState('EMAIL')
  const url = '/campaigns'
  const body = {
    // 'type': campaignType.toLowerCase() } // not yet functional - api doc incorrect
  }

  const { loadState, dataState, errorState } = useFetch(url, body, [campaignType])
  const { isLoading } = loadState
  const { data } = dataState
  const { error } = errorState

  return (
    <>
      <h1>Campaigns</h1>
      <CampaignTypeSelect type={campaignType} setType={setCampaignType} />
      <ul>
        {
          isLoading ? (
            <Loader />
          ) :
            data ?
              data.campaigns.map(c => (
                <CampaignListItem
                  key={c.id}
                  name={c.name}
                  type={c.type}
                  subject={c.subject}
                />
              )) : (
                <h2>{error}</h2>
              )
        }
      </ul>
    </>
  )
}

export default CampaignList