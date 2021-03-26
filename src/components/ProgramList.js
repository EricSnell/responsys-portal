import React from 'react'
import { useFetch } from '../hooks/useFetch'
import Loader from './Loader'
import SearchForm from './SearchForm'
import ProgramListItem from './ProgramListItem'
import { useAuthState } from '../contexts/index'

const ProgramList = () => {
  const auth = useAuthState()
  const url = `/programs`
  const body = {
    'auth_token': auth.token,
    'endpoint': auth.endpoint,
  }
  const { loadState, dataState, errorState } = useFetch(url, body)
  const { isLoading, setIsLoading } = loadState
  const { data, setData } = dataState
  const { error, setError } = errorState

  async function fetchProgram(programName) {
    setIsLoading(true)
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
      let response = await fetch(`/programs/${programName}`, options)
      let result = await response.json()
      if (result.status === 200) {
        setIsLoading(false)
        setData({ programs: [result.data] })
      } else if (result.status === 401) {
        // show login modal
      } else {
        setError(result.error)
        setIsLoading(false)
        setData(null)
      }
    } catch (err) {
      console.log('Fetch error:', err)
      setIsLoading(false)
    }
  }

  async function unpublishProg(e) {
    const { program } = e.target.dataset
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
      let response = await fetch(`/programs/${program}/unpublish`, options)
      let result = await response.json()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>Programs</h1>
      <SearchForm handleSearch={fetchProgram} purpose='Program' />
      {
        isLoading ? (
          <Loader />
        ) : (
            data ? (
              <ul>
                {
                  data.programs.map(p => (
                    <ProgramListItem
                      key={p.id}
                      name={p.name}
                      publishDate={p.publishDate}
                      status={p.status}
                      channels={p.channels}
                      creator={p.createdBy}
                      createdDate={p.createdOn}
                      modifier={p.modifiedBy}
                      modifiedDate={p.modifiedOn}
                      unpublishHandler={unpublishProg}
                    />
                  ))
                }
              </ul>
            ) : (
                <h2>{error}</h2>
              )
          )
      }
    </>
  )
}

export default ProgramList