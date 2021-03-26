import React, { useState, useEffect } from 'react'

const ProgramItem = ({ id, name, status, channels, creator, createdDate, modifier, modifiedDate }) => {
  const [published, togglePublish] = useState('')

  /*
    useEffect(() => {
      fetchPublishStatus();
  
      async function fetchPublishStatus() {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: new URLSearchParams({
            'auth_token': token,
            'endpoint': endpoint,
            'campaign_name': id
          })
        }
        try {
          let response = await fetch(`/programs/${id}`, options)
          let result = await response.json()
          console.log('publish deets!>>', result)
          togglePublish()
        } catch (err) {
          console.log(err)
        }
      }
    }, [token, endpoint, id])
  */

  return (
    <li>
      <h3>{name}</h3>
      <h4>Status: {status}</h4>
      <h4>Channels: {channels}</h4>
      <h4>Created By: {creator}</h4>
      <h4>Created On: {createdDate}</h4>
      <h4>Modified By: {modifier}</h4>
      <h4>Modified On: {modifiedDate}</h4>
    </li>
  )
}

export default ProgramItem