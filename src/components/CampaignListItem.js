import React from 'react'
import { Link } from '@reach/router'

const CampaignListItem = ({ name, type, subject }) => {
  return (
    <li>
      <Link to={`${type.toLowerCase()}/${name}`}>
        <h3>{name}</h3>
        <h4>{type}</h4>
        <h4>{subject}</h4>
      </Link>
    </li>
  )
}

export default CampaignListItem