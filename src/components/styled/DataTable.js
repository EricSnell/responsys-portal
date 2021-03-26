import styled from 'styled-components'

export const TableWraper = styled.div`
  width: 100%;
  overflow-x: auto;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .3);
  border-radius: 5px;
  margin-bottom: 6rem;
`

export const Tableau = styled.table`
  width: 100%;
  border-spacing: 0;
`

export const TableHeader = styled.th`
  padding: 25px 20px;
  text-align: left;
`

export const TableFieldName = styled.th`
  background-color: #0899ff;
  color: #fff;
  padding: 15px 20px;
  text-align: left;
  font-size: 1.3rem;
`

export const TableRow = styled.tr`

`

export const TableCell = styled.td`
  background-color: #f9f9f9;
  padding: 25px 20px;
  border-bottom: 1px solid #eee;
  color: #555;
  font-size: 1.2rem;
`
