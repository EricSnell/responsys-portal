import React, { useState, useEffect } from 'react'
import Loader from './Loader'
import Modal from './Modal'
import { useAuthState } from '../contexts/index'
import { TableWraper, Tableau, TableRow, TableFieldName, TableCell } from './styled/DataTable'
import styled from 'styled-components'

const LinkTableName = styled.h1`
  font-size: 3rem;
  margin-bottom: 5rem;
`

const EditButton = styled.button`
  font-weight: bold;
  color: #6200ee;
  background: none;
  font-size: 1.2rem;
  padding: 20px 20px;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    color: #eee;
  }
`

const LinkTableItem = ({ id, folder }) => {
  const auth = useAuthState()
  const [linkTable, setLinkTable] = useState({ fieldNames: [], records: [] })
  const [linkUpdated, setLinkUpdated] = useState(false)
  const [showModal, toggleModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentLink, setCurrentLink] = useState()

  useEffect(() => {
    setLinkTable(null)
    setLinkUpdated(false)
    fetchLinkTable(id)

    async function fetchLinkTable(name) {
      setIsLoading(true)
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
          'auth_token': auth.token,
          'endpoint': auth.endpoint,
          'folder': folder
        })
      }
      try {
        let response = await fetch(`/linktable/${id}`, options)
        let result = await response.json()
        setLinkTable(result.recordData)
        setIsLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
  }, [id, folder, auth.endpoint, auth.token, linkUpdated])

  async function updateLink() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams({
        'auth_token': auth.token,
        'endpoint': auth.endpoint,
        'folder': folder,
        'link_name': currentLink.link_name,
        'link_url': currentLink.link_url
      })
    }
    try {
      let response = await fetch(`/linktable/${id}/update`, options)
      let result = await response.json()
      console.log(result)
      setLinkUpdated(true)
    } catch (err) {
      console.error(err)
    }

    toggleModal(!showModal)
  }

  function handleEdit(e) {
    console.log(e.target.dataset.linkname, linkTable)
    let { linkname } = e.target.dataset
    let { fieldValues: link } = linkTable.records.find(link => link.fieldValues[0] === linkname)
    console.log(link)
    setCurrentLink({
      link_name: link[0],
      link_url: link[1],
      category: link[2],
      tracking: link[3],
      ios_url: link[6],
      android_url: link[7]
    })
    toggleModal(!showModal)
  }

  return (
    isLoading ? (
      <Loader />
    ) :
      linkTable ? (
        <>
          {
            showModal ? (
              <Modal>
                <form onSubmit={e => {
                  e.preventDefault()
                  updateLink()
                }}
                >
                  <label>Link Name:</label>
                  <input
                    type="text"
                    value={currentLink.link_name}
                    onChange={e => {
                      setCurrentLink({
                        ...currentLink,
                        link_name: e.target.value
                      })
                    }}
                  />
                  <label>URL:</label>
                  <input
                    type="text"
                    value={currentLink.link_url}
                    onChange={e => {
                      setCurrentLink({
                        ...currentLink,
                        link_url: e.target.value
                      })
                    }}
                  />
                  <button onClick={() => toggleModal(!showModal)}>Close</button>
                  <button type="submit">Submit</button>
                </form>
              </Modal>
            ) : null
          }

          <LinkTableName>{id}</LinkTableName>
          <TableWraper>
            <Tableau>
              <tbody>
                <TableRow>
                  {
                    linkTable.fieldNames.map(field => (
                      <TableFieldName key={field} >{field}</TableFieldName>
                    ))
                  }
                </TableRow>
                {
                  linkTable.records.map(link => (
                    <TableRow key={link.fieldValues[0]}>
                      <TableCell>
                        <EditButton
                          data-linkname={link.fieldValues[0]}
                          onClick={handleEdit}
                          disabled={showModal}
                        >Edit
                        </EditButton>
                      </TableCell>
                      {
                        link.fieldValues.map((field, i) => (
                          <TableCell key={i}>{field}</TableCell>
                        ))
                      }
                    </TableRow>
                  ))
                }
              </tbody>
            </Tableau>
          </TableWraper>
        </>
      ) : (
          <h2>woops</h2>
        )
  )
}

export default LinkTableItem