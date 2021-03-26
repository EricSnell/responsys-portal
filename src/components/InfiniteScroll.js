import React, { useState, useRef, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'
import Loader from './Loader'

const InfiniteScroll = ({ children, updateHandler, fetchUrl, StyledCmp }) => {
  const [reachedThreshold, setReachedThreshold] = useState(false)
  const limit = useRef(200) // remove after implementing url from payload 
  const url = reachedThreshold ? fetchUrl : null
  const { loadState, errorState, dataState } = useFetch(url, { limit: limit.current }, [reachedThreshold], reachedThreshold)
  const { isLoading } = loadState
  const { error } = errorState
  const { data } = dataState

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    let threshold = scrollHeight * .75 // 75% of height
    if (isLoading || reachedThreshold || !fetchUrl) return
    if (scrollTop + clientHeight >= threshold) setReachedThreshold(true)
  }

  useEffect(() => {
    if (!reachedThreshold) return
    updateHandler(data)
  }, [data])

  return (
    <StyledCmp onScroll={handleScroll}>
      {children}
      {isLoading && <li><Loader /></li>}
      {error && <li>{error}</li>}
    </StyledCmp>
  )
}

export default InfiniteScroll