import styled from 'styled-components';

const Table = styled.table`
  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th,
  td,
  tr {
    padding: 5px;
  }
  th {
    text-align: left;
  }
  table {
    width: 100%;
  }
`;


export { Table };
