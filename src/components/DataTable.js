import React from 'react'
import { Link } from '@reach/router'
import { TableWraper, Tableau, TableHeader, TableRow, TableFieldName, TableCell } from './styled/DataTable'
import styled from 'styled-components'

const CampaignDetailsCardHeaderLink = styled(Link)`
  font-weight: bold;
  color: #6200ee;
  &:hover {
    text-decoration: underline;
  }
`

const DataTable = ({ dataSources, listName, isList = false }) => {
  return (
    <>
      {
        dataSources
          .map(table => (
            <TableWraper key={table.alias}>
              <Tableau>
                <tbody>
                  <TableRow>
                    <TableHeader colSpan={4}>
                      {
                        isList ? (
                          `${table.path} -- ${table.alias}`
                        ) : (
                            <CampaignDetailsCardHeaderLink to={`/${listName}/pets/${table.path.split('/')[1]}`}>
                              {table.path} -- {table.alias}
                            </CampaignDetailsCardHeaderLink>
                          )
                      }
                    </TableHeader>
                  </TableRow>
                  <TableRow>
                    <TableFieldName>Alias</TableFieldName>
                    <TableFieldName>Field</TableFieldName>
                    <TableFieldName>Default Value</TableFieldName>
                    <TableFieldName>Look Up</TableFieldName>
                  </TableRow>
                  {
                    table.fields.map(field => (
                      <TableRow key={field.alias}>
                        <TableCell>{field.alias}</TableCell>
                        <TableCell>{field.name}</TableCell>
                        <TableCell>{field.defaultValue}</TableCell>
                        <TableCell >{field.lookUpKey ? '\u2713' : null}</TableCell>
                      </TableRow>
                    ))
                  }
                </tbody>
              </Tableau>
            </TableWraper>
          ))
      }
    </>
  )
}

export default DataTable