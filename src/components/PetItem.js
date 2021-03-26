import React, { useState } from 'react'
import SearchForm from './SearchForm'
import { TableWraper, Tableau, TableFieldName, TableCell } from './styled/DataTable'
import { useAuthState } from '../contexts/index'
import styled from 'styled-components'


const Header = styled.h2`
  font-size: 2rem;
  color: #103742;
  font-weight: 800;
  margin-bottom: 1.3rem;
`

const Result = styled.p`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 20px;
`


const PetItem = ({ list, id }) => {
  const auth = useAuthState()
  const [petData, setPetData] = useState({ fieldNames: [], records: [] })

  async function searchPet(email) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams({
        'auth_token': auth.token,
        'endpoint': auth.endpoint,
        'email': email,
      })
    }
    try {
      let response = await fetch(`/lists/${list}/pets/${id}`, options)
      if (response.status === 200) {
        let result = await response.json()
        setPetData(result.recordData)
      } else {
        setPetData({ fieldNames: [], records: [] })
        throw new Error(response.statusText)
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header>{id}</Header>
      <SearchForm handleSearch={searchPet} purpose={'Pet'} />
      {
        petData.fieldNames.length ? (
          <>
            <Result>{petData.records.length} found</Result>
            <TableWraper>
              <Tableau>
                <tbody>
                  <tr>
                    {petData.fieldNames.map(i => (
                      <TableFieldName key={i}>{i}</TableFieldName>)
                    )}
                  </tr>
                  {
                    petData.records.map(i => (
                      <tr key={i[0]}>
                        {i.map((f, idx) => (
                          <TableCell key={idx}>{f}</TableCell>)
                        )}
                      </tr>
                    ))
                  }
                </tbody>
              </Tableau>
            </TableWraper>
          </>
        ) : (
            <h2>No results found</h2>
          )
      }
    </>
  )
}

export default PetItem