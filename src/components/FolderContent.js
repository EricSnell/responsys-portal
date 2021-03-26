import React from 'react'
import { useFetch } from '../hooks/useFetch'
import Loader from './Loader'
import InfiniteScroll from './InfiniteScroll'
import { Link } from '@reach/router'
import styled from 'styled-components'

const ContentContainer = styled.section`
`

const Header = styled.h1`
  font-size: 1.8rem;
  text-align: center;
  color: #103742;
  margin-bottom: 2rem;
`

const ContentListItem = styled.li`
  display: flex;
  align-content: center;
  height: 4rem;
  font-weight: 500;
  border-bottom: 2px solid #eee;
  list-style-type: none;
  font-size: 20px;
  &:hover {
    background: #eee;
  }
`

const ContentLink = styled(Link)`
  line-height: 4rem;
  width: 100%;
  height: 100%;
  color: #333;
  padding-left: 10px;
  text-decoration: none;
  &:visited {
    color: #333;
  }
`

const ContentList = styled.ul`
  height: 800px;
  overflow: scroll;
`

const FolderContent = ({ id, url, route = '', uri, title }) => {
  const fetchUrl = url || uri
  const { loadState, dataState, errorState } = useFetch(fetchUrl, {}, [id])
  const { isLoading } = loadState
  const { data, setData } = dataState
  const { error } = errorState

  return (
    <ContentContainer>
      <Header>{id || title}</Header>
      {
        isLoading ? (
          <Loader />
        ) :
          data ? (
            <InfiniteScroll
              updateHandler={scrollData => setData([...data, ...scrollData])}
              fetchUrl={id}
              StyledCmp={ContentList}
            >
              {
                data.map(content => (
                  <ContentListItem key={content.id}>
                    <ContentLink to={`${route}${content.name}`} >
                      {content.name}
                    </ContentLink>
                  </ContentListItem>
                ))
              }
            </InfiniteScroll>
          ) : (
              <h2>{error}</h2>
            )
      }
    </ContentContainer>
  )
}

export default FolderContent