import { useState, useEffect, useRef } from 'react'
import { navigate } from '@reach/router'
import { useAuthState, useAuthDispatch, logout } from '../contexts/index'

export const useFetch = (url, body, dependencies = []) => {
  const auth = useAuthState()
  const dispatch = useAuthDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {

    if (!url) return
    fetchData(url, body)
    console.log('fetchin: ', url);
    async function fetchData(url, body) {
      setIsLoading(true)
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
          auth_token: auth.token,
          endpoint: auth.endpoint,
          ...body
        })
      }
      try {
        let response = await fetch(url, options)
        let result = await response.json()
        if (response.status === 200) {
          setData(result)
          setIsLoading(false)
        } else if (response.status === 401) {
          setIsLoading(false)
          logout(dispatch)
          navigate('/')
        } else {
          setError(result.error)
          setIsLoading(false)
          setData(null)
        }
      } catch (err) {
        setIsLoading(false)
      }
    }
  }, [...dependencies])

  return {
    loadState: { isLoading, setIsLoading },
    dataState: { data, setData },
    errorState: { error, setError }
  }
}

