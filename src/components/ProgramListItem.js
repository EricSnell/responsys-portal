import React from 'react'

const ProgramListItem = (props) => {
  return (
    <li>
      <h3>{props.name}</h3>
      <h4>Status: {props.status}</h4>
      <h4>Published: {props.publishDate || 'Not Published'}</h4>
      <h4>Channels: {props.channels}</h4>
      <h4>Created By: {props.creator}</h4>
      <h4>Created On: {props.reatedDate}</h4>
      <h4>Modified By: {props.modifier}</h4>
      <h4>Modified On: {props.modifiedDate}</h4>
      {props.publishDate && props.status === 'RUNNING' ? (
        <button onClick={props.unpublishHandler} data-program={props.name}>Unpublish</button>
      ) : (
          null
        )
      }
    </li>
  )
}

export default ProgramListItem