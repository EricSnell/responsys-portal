import React, { useState } from 'react'
import styled from 'styled-components'

const Label = styled.label`
  color: #666260;
  font-size: 1.3rem;
  display: inline-block;
  margin-bottom: 1.4rem;
  & input {
    font-size: 1.6rem;
    background: #f2f2f2;
    border-radius: 4px;
    width: 100%;
    padding: 10px;
  }
`

const Button = styled.button`
  padding: 12px 24px;
  margin-bottom: 15px;
  font-size: 1.3rem;
  color: #fff;
  border-radius: 4px;
  background: #6e08ff;
  &:hover {
    cursor: pointer;
    background-color: #6200ee;
  }
`

const SearchForm = ({ handleSearch, purpose }) => {
  const [searchQuery, setSearchQuery] = useState()
  const id = `search-${purpose.toLowerCase()}`
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        if (searchQuery) handleSearch(searchQuery)
      }}
    >
      <Label htmlFor={id}>Email:
      <input
          type='text'
          id={id}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </Label>
      <Button type="submit">Search</Button>
    </form>
  )
}

export default SearchForm