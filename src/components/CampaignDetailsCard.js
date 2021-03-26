import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'


const Card = styled.table`
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .3);
  border-radius: 5px;
  padding: 2rem 1.4rem;
  width: 800px;
  margin-bottom: 5rem;
  & td {
    padding-bottom: 1.3rem;
  }
`

const CardLink = styled(Link)`
  font-weight: bold;
  color: #6200ee;
  &:hover {
    text-decoration: underline;
  }
`

const CampaignDetailsCard = ({ campaign }) => {

  return (
    <Card>
      <tbody>
        {campaign.linkTablePath && (
          <tr>
            <td>Link Table</td>
            <td>
              <CardLink to={`/linktables/${campaign.linkTablePath}`}>
                {campaign.linkTablePath.split('/')[1]}
              </CardLink>
            </td>
          </tr>
        )}
        <tr>
          <td>Purpose</td>
          <td>{campaign.purpose}</td>
        </tr>
        <tr>
          <td>Marketing Strategy</td>
          <td>{campaign.marketingStrategy}</td>
        </tr>
        <tr>
          <td>Link tracking enbaled</td>
          <td>{campaign.enableLinkTracking ? 'yes' : 'no'}</td>
        </tr>
        <tr>
          <td>External link tracking enbaled</td>
          <td>{campaign.enableExternalTracking ? 'yes' : 'no'}</td>
        </tr>
        <tr>
          <td>Seed List</td>
          <td>{campaign.seedListPath}</td>
        </tr>
        <tr>
          <td>Supplementary Data Sources</td>
          <td>{campaign.supplementaryCampaignDataSourcePaths || '-'}</td>
        </tr>
        <tr>
          <td>Segmentation Reporting</td>
          <td>{campaign.segmentTrackingColumnName || '-'}</td>
        </tr>
      </tbody>
    </Card>
  )
}

export default CampaignDetailsCard