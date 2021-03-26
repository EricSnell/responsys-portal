import React from 'react'

const CampaignTypeSelect = ({ setType, type }) => {
  return (
    <form>
      <label htmlFor="campaign-type">Type</label>
      <select
        id="campaign-type"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        <option>EMAIL</option>
        <option>SMS</option>
        <option>PUSH</option>
      </select>
    </form>
  )
}

export default CampaignTypeSelect