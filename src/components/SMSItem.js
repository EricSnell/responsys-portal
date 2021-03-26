import React, { useState, useEffect } from 'react'
import Loader from './Loader'
import { Link } from '@reach/router'
import { useAuthState } from '../contexts/index'

const CampaignItem = ({ id }) => {
  const auth = useAuthState()
  const [campaign, setCampaignDetails] = useState({})

  useEffect(() => {
    console.log('SMS COMPONENT')
    setCampaignDetails({}); // empty before populating 
    fetchCampaignDetails();

    async function fetchCampaignDetails() {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
          'auth_token': auth.token,
          'endpoint': auth.endpoint,
        })
      }
      try {
        let response = await fetch(`/campaigns/sms/${id}`, options)
        let result = await response.json()
        console.log(result)
        setCampaignDetails(result)
      } catch (err) {
        console.log(err)
      }
    }
  }, [id, auth.endpoint, auth.token])



  return (
    campaign.name ? (
      <div>
        <h1>{campaign.name}</h1>
        <p>Subject Line: {campaign.subject}</p>
        <p>Link Table:
          <Link to={`/linktables/${campaign.linkTablePath}`}>
            {campaign.linkTablePath.split('/')[1]}
          </Link>
        </p>
        <p>Purpose: {campaign.purpose}</p>
        <p>Marketing Strategy: {campaign.marketingStrategy}</p>
        <p>Link tracking enbaled: {campaign.enableLinkTracking ? 'yes' : 'no'}</p>
        <p>External link tracking enbaled: {campaign.enableExternalTracking ? 'yes' : 'no'}</p>
        <p>Seed List: {campaign.seedListPath}</p>
        <p>Supplementary Data Sources: {campaign.supplementaryCampaignDataSourcePaths}</p>
        <div>
          Tables: {
            campaign.dataSource
              .filter(i => i.type === 'PROFILE_LIST')
              .map(i => (
                <table border="solid" key={i.alias}>
                  <tbody>
                    <tr>
                      <th colSpan={4}>
                        {i.path} -- {i.alias}
                      </th>
                    </tr>
                    {
                      i.fields.map(f => (
                        <tr>
                          <td>{f.alias}</td>
                          <td>{f.name}</td>
                          <td>{f.defaultValue}</td>
                          <td>{f.lookUpKey ? 'LOOKUP-KEY' : null}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              ))
          }
          {
            campaign.dataSource
              .filter(i => i.type === 'PET')
              .map(i => (
                <table border="solid">
                  <tbody>
                    <tr>
                      <th colSpan={4}>
                        <Link to={`/${campaign.dataSource.find(i => i.type === 'PROFILE_LIST').path.split('/')[1]}/pets/${i.path.split('/')[1]}`}>
                          {i.path} -- {i.alias}
                        </Link>
                      </th>
                    </tr>
                    {
                      i.fields.map(f => (
                        <tr>
                          <td>{f.alias}</td>
                          <td>{f.name}</td>
                          <td>{f.defaultValue}</td>
                          <td>{f.lookUpKey ? 'LOOKUP-KEY' : null}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              ))
          }
        </div>
        <div>
          Dynamic Variables:
          <table border="solid">
            <tbody>
              <tr>
                <th>Alias</th>
                <th>Default Value</th>
              </tr>
              {
                campaign.dataSource
                  .filter(i => i.type === 'DYNAMIC_VARIABLE')
                  .map(i => (
                    <tr>
                      <td>{i.alias}</td>
                      <td>{i.defaultValue}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>

        {
          campaign.filterPaths ? (
            <p>Filter: {campaign.filterPaths}</p>
          ) : (
              <p>SQL View: {campaign.refiningDataSourcePath}</p>
            )
        }
        <p>Segmentation Reporting: {campaign.segmentTrackingColumnName}</p>
      </div>
    ) : (
        <Loader />
      )
  )
}

export default CampaignItem