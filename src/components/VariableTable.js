import React from 'react'
import { TableWraper, Tableau, TableHeader, TableRow, TableFieldName, TableCell } from './styled/DataTable'

const VariableTable = ({ dataSources }) => {
  return (
    <TableWraper>
      <Tableau border="solid">
        <tbody>
          <TableRow>
            <TableHeader colSpan={2}>Dynamic Variables</TableHeader>
          </TableRow>
          <TableRow>
            <TableFieldName>Alias</TableFieldName>
            <TableFieldName>Default Value</TableFieldName>
          </TableRow>
          {
            dataSources
              .filter(i => i.type === 'DYNAMIC_VARIABLE')
              .map(i => (
                <TableRow key={i.alias}>
                  <TableCell>{i.alias}</TableCell>
                  <TableCell>{i.defaultValue}</TableCell>
                </TableRow>
              ))
          }
        </tbody>
      </Tableau>
    </TableWraper>
  )
}

export default VariableTable